package com.tap.members.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.members.dto.MembersDTO;
import com.tap.members.service.MembersService;

@RestController
@RequestMapping("/members")
public class MembersController {

	@Autowired
	private MembersService mserv;
	
	@Autowired
	private PasswordEncoder pe;

	@GetMapping("/{id}")
	public ResponseEntity<MembersDTO> selectById(@PathVariable String id) throws Exception {
		System.out.println(id);
		return ResponseEntity.ok(mserv.selectById(id));
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

}
