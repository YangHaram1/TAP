package com.tap.chatupload.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.chatupload.dao.ChatUploadDAO;
import com.tap.chatupload.dto.ChatUploadDTO;

@Service
public class ChatUploadService {
	@Autowired
	private ChatUploadDAO dao;
	public void insert(ChatUploadDTO dto) throws Exception{
		dao.insert(dto);
	}
	
}
