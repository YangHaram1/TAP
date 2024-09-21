package com.tap.reply.controller;

import java.lang.reflect.Type;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.tap.reply.dto.ReplyDTO;
import com.tap.reply.service.ReplyService;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/reply")
public class ReplyController {
	
	@Autowired
	private ReplyService rserv;
	
	
	@PostMapping
	public ResponseEntity<String> insert(Principal principal,@RequestBody ReplyDTO dto) throws Exception {
		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		dto.setMember_id(username);
		int result=rserv.insert(dto);
		if(result>0) {
			return ResponseEntity.ok("success");
		}
		return ResponseEntity.ok("fail");
	}
	
	@GetMapping("/{parentSeq}")
	public ResponseEntity<ReplyDTO> get(@PathVariable int parentSeq) throws Exception {
		
		ReplyDTO dto =rserv.selectByParentSeq(parentSeq);
		return ResponseEntity.ok(dto);
	}
	
	@DeleteMapping("/{seq}/{parentSeq}")
	public ResponseEntity<String> deleteBySeq(@PathVariable int seq,@PathVariable int parentSeq) throws Exception{
		int result=rserv.deleteBySeq(seq,parentSeq);
		if(result>0) {
			return ResponseEntity.ok("success");
		}
		return ResponseEntity.ok("fail");
	}
	
	@PutMapping
	public ResponseEntity<String> update(Principal principal,@RequestBody ReplyDTO dto) {
		
		int result=rserv.update(dto);
		if(result>0) {
			return ResponseEntity.ok("success");
		}
		return ResponseEntity.ok("fail");
	}

}
