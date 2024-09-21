package com.tap.members.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tap.email.service.EmailService;
import com.tap.members.dto.MembersDTO;
import com.tap.members.dto.MembersDeliveryDTO;
import com.tap.members.service.MembersService;

@RestController
@RequestMapping("/members")
public class MembersController {

	// 이메일과 인증 코드를 임시 저장하는 HashMap
	private Map<String, String> verificationCodes = new HashMap<>();

	@Autowired
	private MembersService mserv;

	@Autowired
	private PasswordEncoder pe;
	@Autowired
	private EmailService emailService; // EmailService를 주입받습니다.

	// 이메일로 인증 코드 전송
	@PostMapping("/requestEmailVerification/{email}")
	public ResponseEntity<String> requestEmailVerification(@PathVariable("email") String userEmail) {
		try {
			// 인증 코드 생성 및 저장
			String verificationCode = UUID.randomUUID().toString().substring(0, 8);
			verificationCodes.put(userEmail, verificationCode); // 이메일과 인증 코드 저장

			// 이메일 전송
			emailService.sendVerificationEmail(userEmail, verificationCode);

			return ResponseEntity.ok("이메일 인증 코드가 전송되었습니다.");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
		}
	}

	@PostMapping("/verifyEmail")
	public ResponseEntity<String> verifyEmail(@RequestBody Map<String, String> request) {
		try {
			String userEmail = request.get("email");
			String verificationCode = request.get("code");

			// 저장된 코드와 입력된 코드 비교
			String storedCode = verificationCodes.get(userEmail);

			if (storedCode != null && storedCode.equals(verificationCode)) {
				return ResponseEntity.ok("verified");
			} else {
				return ResponseEntity.badRequest().body("유효하지 않은 인증 코드입니다.");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
		}
	}

	// 회원가입 아이디 중복 검사
	@GetMapping("/id/{id}")
	public ResponseEntity<Integer> selectById(@PathVariable String id) throws Exception {
		int checkId = mserv.checkId(id); // 1 or 0
		return ResponseEntity.ok(checkId);
	}

	// 회원가입 이메일 중복 검사
	@GetMapping("/email/{email}")
	public ResponseEntity<Integer> selectByEmail(@PathVariable String email) throws Exception {
		int checkEmail = mserv.checkEmail(email); // 1 or 0
		return ResponseEntity.ok(checkEmail);
	}

	// 아이디 찾기
	@GetMapping("/findId/{name}/{email}")
	public ResponseEntity<String> findId(@PathVariable String name, @PathVariable String email) throws Exception {
		String findId = mserv.findId(name, email);
		return ResponseEntity.ok(findId);
	}
	
	// 비밀번호 찾기
	@GetMapping("findPw/{id}/{email}")
	public ResponseEntity<String> findPw(@PathVariable String id, @PathVariable String email) throws Exception{
		String findPw = mserv.findPw(id, email);
		return ResponseEntity.ok(findPw);
	}
	@PostMapping("/requestPasswordReset/{email}")
	public ResponseEntity<String> requestPasswordReset(@PathVariable("email") String userEmail) {
	    try {
	        // 비밀번호 재설정 코드 생성 및 저장
	        String resetCode = UUID.randomUUID().toString().substring(0, 8);
	        verificationCodes.put(userEmail, resetCode); // 이메일과 재설정 코드 저장

	        // 비밀번호 재설정 이메일 전송
	        emailService.sendVerificationEmail(userEmail, resetCode);

	        return ResponseEntity.ok("비밀번호 재설정 코드가 전송되었습니다.");
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
	    }
	}

	@PostMapping("/resetPassword")
	public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
	    try {
	        String userEmail = request.get("email");
	        String resetCode = request.get("code");
	        String newPassword = request.get("newPassword");
	        System.out.println(userEmail);
	        System.out.println(newPassword);
	        // 저장된 코드와 입력된 코드 비교
	        String storedCode = verificationCodes.get(userEmail);

	        if (storedCode != null && storedCode.equals(resetCode)) {
	            // 비밀번호 인코딩 및 업데이트
	            String encodedPassword = pe.encode(newPassword);
	            boolean updateSuccessful = mserv.updatePassword(userEmail, encodedPassword);

	            if (updateSuccessful) {
	                // 재설정 코드 삭제
	                verificationCodes.remove(userEmail);
	                return ResponseEntity.ok("비밀번호가 성공적으로 재설정되었습니다.");
	            } else {
	                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("비밀번호 업데이트 실패");
	            }
	        } else {
	            return ResponseEntity.badRequest().body("유효하지 않은 재설정 코드입니다.");
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
	    }
	}

	@GetMapping
	public ResponseEntity<MembersDTO> selectById(Principal principal) throws Exception {
		if (principal == null) {
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		UserDetails user = mserv.loadUserByUsername(username);

		return ResponseEntity.ok(mserv.selectById(user.getUsername()));
	}

	@PutMapping
	public ResponseEntity<String> update(@RequestBody MembersDTO dto) throws Exception {
		int check = mserv.updateMember(dto);
		if (check > 0) {
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found for ID: " + dto.getId());
		}
	}

	@PutMapping("/{pw}")
	public ResponseEntity<String> updatePw(Principal principal, @PathVariable String pw) throws Exception {
		if (principal == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
		}
		String username = principal.getName();
		UserDetails user = mserv.loadUserByUsername(username);

		String encode = pe.encode(pw);

		int check = mserv.updatePwById(user.getUsername(), encode);
		if (check > 0) {
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found for ID:");
		}
	}

	// 회원가입 등록
	@PostMapping("/registerUser")
	public ResponseEntity<String> signUp(@RequestBody MembersDeliveryDTO dto) throws Exception {
		// 패스워드 인코딩
		String encodedPassword = pe.encode(dto.getPw());
		dto.setPw(encodedPassword);
		// 회원가입 처리
		mserv.signUp(dto);
		// 회원가입 성공
		return ResponseEntity.ok().build();

	}

	@PatchMapping("/{deliverySeq}")
	public ResponseEntity<String> updateDeliverySeq(Principal principal, @PathVariable int deliverySeq)
			throws Exception {
		if (principal == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
		}
		String username = principal.getName();
		int check = mserv.updateDeliverySeq(username, deliverySeq);

		if (check > 0) {
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found for ID:");
		}
	}
}
