package com.tap.groupmember.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.groupmember.dto.GroupMemberDTO;

@Repository
public class GroupMemberDAO {
	
	@Autowired
	private SqlSession mybatis;
	
	public void insert(int seq,String id) throws Exception{
		Map<String, Object> map=new HashMap<>();
		map.put("group_seq", seq);
		map.put("member_id", id);
		
		mybatis.insert("GroupMember.insert",map);
		
	}
	
	public void insertAdmin(int seq,List<String> list) throws Exception{
	
		
		for (String string : list) {
			Map<String, Object> map=new HashMap<>();
			map.put("group_seq", seq);
			map.put("id", string);
			mybatis.insert("GroupMember.insertAdmin",map);
		}
		
	}
	
	public int checkById(String memberId) throws Exception{
		
		Integer groupSeq = mybatis.selectOne("GroupMember.checkById",memberId);
		if (groupSeq == null) {
		    groupSeq = 0;
		}
		return groupSeq;
	}
	
	public List<GroupMemberDTO> membersByGroupSeq(int groupSeq) throws Exception{
		return mybatis.selectList("GroupMember.membersByGroupSeq",groupSeq);
	}
	
	
	public List<GroupMemberDTO> list(String adminName) throws Exception{
		
		return mybatis.selectList("GroupMember.list",adminName);
	}

	public String memberId(int groupSeq) {
		
		return mybatis.selectOne("GroupMember.memberId",groupSeq);
	}
	
	public void updateCheck(int group_seq,String member_id,int last_chat_seq) throws Exception{
		Map<String, String> map = new HashMap<>();
		map.put("group_seq", String.valueOf(group_seq));
		map.put("member_id", member_id);
		map.put("last_chat_seq", String.valueOf(last_chat_seq));
		mybatis.delete("GroupMember.updateCheck", map);
	}
	
	public void updateAlarm(int group_seq,String member_id) throws Exception{
		Map<String, String> map = new HashMap<>();
		map.put("group_seq", String.valueOf(group_seq));
		map.put("member_id", member_id);
		mybatis.delete("GroupMember.updateAlarm", map);
	}
	
	public void updateBookmark(int group_seq,String member_id) throws Exception{
		Map<String, String> map = new HashMap<>();
		map.put("group_seq", String.valueOf(group_seq));
		map.put("member_id", member_id);
		mybatis.delete("GroupMember.updateBookmark", map);
	}
	



}
