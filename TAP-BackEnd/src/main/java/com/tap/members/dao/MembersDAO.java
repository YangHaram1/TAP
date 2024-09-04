package com.tap.members.dao;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.members.dto.MembersDTO;

@Repository
public class MembersDAO {
	@Autowired
	private SqlSession mybatis;
	
	public MembersDTO selectById(String id) throws Exception{
		
		return mybatis.selectOne("Members.selectById",id);
	}
	
	public MembersDTO getPw(String id) throws Exception{
		return mybatis.selectOne("Members.getPw",id);
	}

}
