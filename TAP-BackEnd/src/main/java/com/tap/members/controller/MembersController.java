package com.tap.members.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.members.dto.MembersDTO;
import com.tap.members.service.MembersService;

@RestController
@RequestMapping("/members")
public class MembersController {
	
	@Autowired
	private MembersService mserv;
	
	@GetMapping("/{id}")
	public ResponseEntity<MembersDTO> selectById(@PathVariable String id) throws Exception{
		
		return ResponseEntity.ok(mserv.selectById(id));
	}
}