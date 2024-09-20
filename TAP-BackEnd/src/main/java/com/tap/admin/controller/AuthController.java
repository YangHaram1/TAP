package com.tap.admin.controller;

import java.security.Principal;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.admin.dto.AdminLogDTO;
import com.tap.admin.services.AdminLogService;
import com.tap.members.dto.MembersGradeDTO;
import com.tap.members.service.MembersService;
import com.tap.z_utils.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private JwtUtil jwt;

	@Autowired
	private PasswordEncoder pe;

	@Autowired
	private MembersService mserv;

	@Autowired
	private AdminLogService adminLogService;

	// httpservletRequest 추가(로그 아이피)
	@PostMapping("/{id}/{pw}")
	public ResponseEntity<String> login(@PathVariable String id, @PathVariable String pw, HttpServletRequest request)
			throws Exception {
		// 사용자가 입력한 비밀번호
		// 데이터베이스에서 가져온 암호화된 비밀번호
		MembersGradeDTO dto = null;
		String clientIp = getClientIp(request);
		LocalDateTime localLogTime = LocalDateTime.now();

		try {
			dto = mserv.getMemberInfo(id); // 데이터베이스에서 조회한 사용자 정보
		} catch (Exception e) {
			// 로그를 남길 때 예외가 발생해도 실패 로그는 기록해야 함
			System.out.println("로그인 실패: 사용자 정보 조회 오류");
		}

		if (dto != null) {
			// 비밀번호 검증
			boolean check = pe.matches(pw, dto.getPw());
			if (check) {

				if (dto.getGrade().equals("pending")) {

					// 로그인 성공 로그 기록
					AdminLogDTO logDto = new AdminLogDTO();
					logDto.setMemberId(id);
					logDto.setName(dto.getName());
					logDto.setClientIp(clientIp);
					logDto.setLocalLogtime(localLogTime);
					logDto.setLogStatus("로그인 실패: 인증 권한 없음");
					adminLogService.insertLog(logDto);

				} else {
					String token = jwt.createToken(id, dto.getRole(), dto.getName(), dto.getGrade());
					jwt.verify(token);

					// 로그인 성공 로그 기록
					AdminLogDTO logDto = new AdminLogDTO();
					logDto.setMemberId(id);
					logDto.setName(dto.getName());
					logDto.setClientIp(clientIp);
					logDto.setLocalLogtime(localLogTime);
					logDto.setLogStatus("로그인 성공");
					adminLogService.insertLog(logDto);

					return ResponseEntity.ok(token);
				}

			} else {
				// 로그인 실패 로그 기록 (비밀번호 불일치)
				AdminLogDTO logDto = new AdminLogDTO();
				logDto.setMemberId(id);
				logDto.setClientIp(clientIp);
				logDto.setLocalLogtime(localLogTime);
				logDto.setLogStatus("로그인 실패: 비밀번호 불일치");
				adminLogService.insertLog(logDto);
			}
		} else {
			// 로그인 실패 로그 기록 (사용자 정보 없음)
			AdminLogDTO logDto = new AdminLogDTO();
			logDto.setMemberId(id);
			logDto.setClientIp(clientIp);
			logDto.setLocalLogtime(localLogTime);
			logDto.setLogStatus("로그인 실패: 사용자 정보 없음");
			adminLogService.insertLog(logDto);
		}

		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}

//	@PostMapping("/{id}/{pw}")
//	public ResponseEntity<String> login(@PathVariable String id, @PathVariable String pw) throws Exception {
//		// 사용자가 입력한 비밀번호
//		// 데이터베이스에서 가져온 암호화된 비밀번호
//		MembersGradeDTO dto = mserv.getMemberInfo(id); // 데이터베이스에서 조회한 암호화된 비밀번호
//		
//		
//		// 비밀번호 검증
//		boolean check = pe.matches(pw, dto.getPw());
//		if (check) {
//			String token = jwt.createToken(id,dto.getRole(),dto.getName(),dto.getGrade());
//			jwt.verify(token);
//			return ResponseEntity.ok(token);
//		} else {
//			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//		}
//	}

	@PostMapping("/{pw}")
	public ResponseEntity<String> checkPw(Principal principal, @PathVariable String pw) throws Exception {

		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");

		}
		String username = principal.getName();
		UserDetails user = mserv.loadUserByUsername(username);

		MembersGradeDTO dto = mserv.getMemberInfo(user.getUsername()); // 데이터베이스에서 조회한 암호화된 비밀번호
		// 비밀번호 검증
		boolean check = pe.matches(pw, dto.getPw());
		if (check) {
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	@PostMapping
	public ResponseEntity<String> verifyToken(HttpServletRequest request) throws Exception {
		// 사실 시큐리티 있어서 비어있어도 검증되긴함.
		String token = jwt.extractToken(request);
		boolean check = jwt.isVerified(token);
		if (check) {
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	// 로그 아이피
	private String getClientIp(HttpServletRequest request) {
		String clientIp = request.getHeader("X-Forwarded-For");
		if (clientIp == null || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) {
			clientIp = request.getHeader("Proxy-Client-IP");
		}
		if (clientIp == null || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) {
			clientIp = request.getHeader("WL-Proxy-Client-IP");
		}
		if (clientIp == null || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) {
			clientIp = request.getRemoteAddr();
		}
		return clientIp;
	}

}
