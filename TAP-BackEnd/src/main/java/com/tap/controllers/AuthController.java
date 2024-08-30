package com.tap.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.services.MembersService;
import com.tap.utils.JwtUtil;

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
	public ResponseEntity<String> login(@PathVariable String id,
			@PathVariable String pw) throws Exception{
		// 사용자가 입력한 비밀번호
		// 데이터베이스에서 가져온 암호화된 비밀번호
		String storedEncodedPassword = mserv.getPw(id); // 데이터베이스에서 조회한 암호화된 비밀번호
		// 비밀번호 검증
		boolean check=pe.matches(pw, storedEncodedPassword);
		if (check) {
			String token=jwt.createToken(id);
			jwt.verify(token);
			return ResponseEntity.ok(token);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}
}
