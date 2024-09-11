package com.tap.admin.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.members.dto.MembersDTO;

@Repository
public class AdminUserMemberDAO {
	@Autowired
	private SqlSession mybatis;

	public List<MembersDTO> selectMember() {
		return	mybatis.selectList("AdminUserMem.getAllUserMem");
		
	}
	public List<MembersDTO> searchUserMems(String keyword, Integer gradeSeq) {
	    Map<String, Object> params = new HashMap<>();
	    params.put("keyword", keyword);
	    params.put("gradeSeq", gradeSeq);

	    return mybatis.selectList("searchUserMem", params);
	}

}
