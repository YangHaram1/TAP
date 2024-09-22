package com.tap.grade.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.grade.dto.GradeDTO;

@Repository
public class GradeDAO {
	@Autowired
	private SqlSession mybatis;
	
	public List<GradeDTO> getGrade(){
		return mybatis.selectList("AdminUserMem.getGrade");
	}

	public List<GradeDTO> selectAll() {
		
		return mybatis.selectList("Grade.selectAll");
	}

}
