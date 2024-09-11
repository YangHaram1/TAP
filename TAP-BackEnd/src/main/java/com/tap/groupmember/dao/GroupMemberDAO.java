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
	
	public int checkById(String member_id) throws Exception{
		
		Integer groupSeq = mybatis.selectOne("GroupMember.checkById",member_id);
		if (groupSeq == null) {
		    groupSeq = 0;
		}
		return groupSeq;
	}
	
	public List<GroupMemberDTO> membersByGroupSeq(int group_seq) throws Exception{
		return mybatis.selectList("GroupMember.membersByGroupSeq",group_seq);
	}

}
