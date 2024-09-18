package com.tap.reply.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.tap.reply.dto.ReplyDTO;
import com.tap.reply.service.ReplyService;

@RestController
@RequestMapping("/reply")
public class ReplyController {
	
	@Autowired
	private ReplyService rsev;
	
	
	@PostMapping
	public ResponseEntity<String> insert(Principal principal) throws Exception {
		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		Gson gson= new Gson();
	
		return ResponseEntity.ok(null);
	}
	
	@GetMapping("/{parentSeq}")
	ResponseEntity<ReplyDTO> get(@PathVariable int parentSeq) throws Exception {
		
		ReplyDTO dto =rsev.selectByParentSeq(parentSeq);
		return ResponseEntity.ok(dto);
	}

}
