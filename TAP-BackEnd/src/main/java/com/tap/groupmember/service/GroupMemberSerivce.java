package com.tap.groupmember.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.groupmember.dao.GroupMemberDAO;
import com.tap.groupmember.dto.GroupMemberDTO;
import com.tap.members.dao.MembersDAO;

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
	public List<GroupMemberDTO> membersByGroupSeq(int group_seq) throws Exception{
		return dao.membersByGroupSeq(group_seq);
	}
	
	public int checkById(String member_id) throws Exception{
		return dao.checkById(member_id);
	}

	public void updateCheck(int group_seq,String member_id,int last_chat_seq) throws Exception{
		dao.updateCheck(group_seq,member_id,last_chat_seq);
	}
	
	public void updateAlarm(int group_seq,String member_id) throws Exception{
		dao.updateAlarm(group_seq,member_id);
	}
	
	public void updateBookmark(int group_seq,String member_id) throws Exception{
		dao.updateBookmark(group_seq,member_id);
	}


}
