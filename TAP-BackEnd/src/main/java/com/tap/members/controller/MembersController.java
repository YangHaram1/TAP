package com.tap.members.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.members.dto.MembersDTO;
import com.tap.members.dto.MembersDeliveryDTO;
import com.tap.members.service.MembersService;

@RestController
@RequestMapping("/members")
public class MembersController {

	@Autowired
	private MembersService mserv;
	
	@Autowired
	private PasswordEncoder pe;

	// 회원가입 아이디 중복 검사
	@GetMapping("/id/{id}")
	public ResponseEntity<Integer> selectById(@PathVariable String id) throws Exception {
		int checkId = mserv.checkId(id);  // 1 or 0
		return ResponseEntity.ok(checkId);
	}
	
	// 회원가입 이메일 중복 검사
	@GetMapping("/email/{email}")
	public ResponseEntity<Integer> selectByEmail(@PathVariable String email) throws Exception {
		int checkEmail = mserv.checkEmail(email);  // 1 or 0
		return ResponseEntity.ok(checkEmail);
	}
	
	// 아이디 찾기
	@GetMapping("/findId/{name}/{email}")
	public ResponseEntity<String> findId(@PathVariable String name, @PathVariable String email) throws Exception{
		String findId = mserv.findId(name, email);
		System.out.println(name);
		System.out.println(email);
		return ResponseEntity.ok(findId);
		
	}
	
	@GetMapping
	public ResponseEntity<MembersDTO> selectById(Principal principal) throws Exception {
		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		UserDetails user = mserv.loadUserByUsername(username);
		
		return ResponseEntity.ok(mserv.selectById(user.getUsername()));
	}


	@PutMapping
	public ResponseEntity<String> update(@RequestBody MembersDTO dto) throws Exception {
		System.out.println(dto.getId());
		int check=mserv.updateMember(dto);
		if(check>0) {
			return ResponseEntity.ok().build();
		}
		else {
			 return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found for ID: " + dto.getId());
		}
	}
	
	@PutMapping("/{pw}")
	public ResponseEntity<String> updatePw(Principal principal,@PathVariable String pw) throws Exception {
		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
		}
		String username = principal.getName();
		UserDetails user = mserv.loadUserByUsername(username);
		
		String encode=pe.encode(pw);
		
		int check=mserv.updatePwById(user.getUsername(),encode);
		if(check>0) {
			return ResponseEntity.ok().build();
		}
		else {
			 return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found for ID:");
		}
	}
	
	// 회원가입 등록
	@PostMapping
	public ResponseEntity<String> signUp(@RequestBody MembersDeliveryDTO dto) throws Exception{
		String encode = pe.encode(dto.getPw());
		dto.setPw(encode);
		mserv.signUp(dto);
		return ResponseEntity.ok().build(); 
	}

}
