package com.tap.groupchat.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.groupchat.dao.GroupChatDAO;
import com.tap.groupmember.dao.GroupMemberDAO;
import com.tap.members.dao.MembersDAO;

import jakarta.transaction.Transactional;

@Service
public class GroupChatService {

	@Autowired
	private GroupChatDAO dao;
	
	@Autowired
	private GroupMemberDAO gmdao;
	
	@Autowired
	private MembersDAO mdao;
	
	@Transactional
	public int insert(String id) throws Exception{
		int seq= dao.insert();
		gmdao.insert(seq, id);
		List<String> list =mdao.selectByAdmin();
		gmdao.insertAdmin(seq,list);
		return seq;
	}
}
