package com.tap.members.dao;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.members.dto.MembersDTO;
import com.tap.members.dto.MembersGradeDTO;

@Repository
public class MembersDAO {
	@Autowired
	private SqlSession mybatis;
	
	public MembersDTO selectById(String id) throws Exception{
		
		return mybatis.selectOne("Members.selectById",id);
	}
	
	public MembersGradeDTO getMemberInfo(String id) throws Exception{
		return mybatis.selectOne("Members.getMemberInfo",id);
	}
	
	public int updateMember(MembersDTO dto) throws Exception{
		return mybatis.update("Members.updateMember",dto);
	}
	
	public int updatePwById(Map<String , String> map) throws Exception{
		return mybatis.update("Members.updatePwById",map);
	}

}
