package com.tap.admin.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.members.dto.MembersDTO;

@Repository
public class AdminUserMemberDAO {
	@Autowired
	private SqlSession mybatis;

	public List<MembersDTO> selectMember(MembersDTO dto) {
		return	mybatis.selectList("AdminUserMem.getAllUserMem", dto);
		
	}
	
}
