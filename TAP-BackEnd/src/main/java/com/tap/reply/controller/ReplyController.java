package com.tap.reply.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	public ResponseEntity<String> insert(Principal principal,@RequestBody ReplyDTO dto) throws Exception {
		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		dto.setMember_id(username);
		int result=rsev.insert(dto);
		if(result>0) {
			return ResponseEntity.ok("success");
		}
		return ResponseEntity.ok("fail");
	}
	
	@GetMapping("/{parentSeq}")
	ResponseEntity<ReplyDTO> get(@PathVariable int parentSeq) throws Exception {
		
		ReplyDTO dto =rsev.selectByParentSeq(parentSeq);
		return ResponseEntity.ok(dto);
	}

}
