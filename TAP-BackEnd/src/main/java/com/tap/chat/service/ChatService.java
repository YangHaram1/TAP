package com.tap.chat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.chat.dao.ChatDAO;
import com.tap.chat.dto.ChatDTO;

@Service
public class ChatService {

	@Autowired
	private ChatDAO dao;
	
	public ChatDTO insert(ChatDTO dto) {
		return dto;
	}
}
