package com.tap.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/members")
public class MembersController {
	
	@GetMapping
	public ResponseEntity<String> getName(@AuthenticationPrincipal UserDetails user){
		
		return ResponseEntity.ok(user.getUsername());
	}
}
