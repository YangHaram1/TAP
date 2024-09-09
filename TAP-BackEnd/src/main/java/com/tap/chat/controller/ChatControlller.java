package com.tap.chat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.chat.dto.ChatDTO;
import com.tap.chat.service.ChatService;

@RestController
@RequestMapping("/chat")
public class ChatControlller {
	
	@Autowired
	private ChatService cserv;
	
	@GetMapping("/{GroupSeq}")
	public ResponseEntity<List<ChatDTO>> selectByGroupSeq(@PathVariable int GroupSeq) throws Exception {

		return ResponseEntity.ok().build();
	}

}
