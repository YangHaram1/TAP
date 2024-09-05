package com.tap.admin.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.members.dto.MembersDTO;
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

	@PostMapping("/{id}/{pw}")
	public ResponseEntity<String> login(@PathVariable String id, @PathVariable String pw) throws Exception {
		// 사용자가 입력한 비밀번호
		// 데이터베이스에서 가져온 암호화된 비밀번호
		MembersGradeDTO dto = mserv.getMemberInfo(id); // 데이터베이스에서 조회한 암호화된 비밀번호
		
		
		// 비밀번호 검증
		boolean check = pe.matches(pw, dto.getPw());
		if (check) {
			String token = jwt.createToken(id,dto.getRole(),dto.getName(),dto.getGrade());
			jwt.verify(token);
			return ResponseEntity.ok(token);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	@PostMapping("/{pw}")
	public ResponseEntity<String> checkPw(Principal principal, @PathVariable String pw) throws Exception {
	
		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");

		}
		String username = principal.getName();
		UserDetails user = mserv.loadUserByUsername(username);
		
		MembersGradeDTO dto  = mserv.getMemberInfo(user.getUsername()); // 데이터베이스에서 조회한 암호화된 비밀번호
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
}
