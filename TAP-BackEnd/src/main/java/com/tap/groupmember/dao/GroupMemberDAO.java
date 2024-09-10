package com.tap.groupmember.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
	
	public boolean checkById(String member_id) throws Exception{
		return mybatis.selectOne("GroupMember.checkById",member_id);
	}

}
