package com.tap.chat.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.chat.dao.ChatDAO;
import com.tap.chat.dto.ChatDTO;

@Service
public class ChatService {

	@Autowired
	private ChatDAO dao;
	
	public ChatDTO insert(ChatDTO dto) throws Exception {
		return dao.insert(dto);
	}
	public List<ChatDTO> selectByGroupSeq(int GroupSeq) throws Exception{
		return dao.selectByGroupSeq(GroupSeq);
	}
	
}
