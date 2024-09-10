package com.tap.groupchat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.groupchat.dao.GroupChatDAO;

@Service
public class GroupChatService {

	@Autowired
	private GroupChatDAO dao;
	
	public int insert() throws Exception{
		return dao.insert();
	}
}
