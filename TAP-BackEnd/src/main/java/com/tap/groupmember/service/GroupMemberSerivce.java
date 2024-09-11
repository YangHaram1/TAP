package com.tap.groupmember.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.groupmember.dao.GroupMemberDAO;
import com.tap.groupmember.dto.GroupMemberDTO;
import com.tap.members.dao.MembersDAO;

import jakarta.transaction.Transactional;

@Service
public class GroupMemberSerivce {
	
	@Autowired
	private GroupMemberDAO dao;
	
	@Autowired
	private MembersDAO mdao;
	
//	@Transactional
//	public void insert(int seq,String id) throws Exception{
//
//	}
	
	
	public List<GroupMemberDTO> members(int groupSeq){
		List<GroupMemberDTO> list=new ArrayList<>();
		return list;
	}
	public int checkById(String member_id) throws Exception{
		return dao.checkById(member_id);
	}
}
