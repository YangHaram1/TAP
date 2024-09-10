package com.tap.biz.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.biz.dto.BizApplyDTO;
import com.tap.biz.dto.TestClobDTO;
import com.tap.biz.dto.TotalScheduleDTO;

@Repository
public class BizDAO {
	@Autowired
	private SqlSession mybatis;
	
	public List<HashMap<String, Object>> getAllCategory(){
		return mybatis.selectList("Biz.getAllCategory");
	}
	public List<HashMap<String, Object>> getAllSubCategory(){
		return mybatis.selectList("Biz.getAllSubCategory");
	}
	public List<HashMap<String, Object>> getAllLocation(){
		return mybatis.selectList("Biz.getAllLocation");
	}
	public List<HashMap<String, Object>> getAllGenre(){
		return mybatis.selectList("Biz.getAllGenre");
	}
	public List<HashMap<String, Object>> getAllTeam(){
		return mybatis.selectList("Biz.getAllTeam");
	}
	public List<HashMap<String, Object>> getAllTeamLocation(){
		return mybatis.selectList("Biz.getAllTeamLocation");
	}
	public List<TestClobDTO> getContent(){
		return mybatis.selectList("Biz.getContent");
	}
	
	public int createApply(BizApplyDTO formData) {
		
	    return mybatis.insert("Biz.createApply", formData);
	    
//	    Integer applicationSeq = formData.getApplication_seq();
	}
	public void createApplySchedule(TotalScheduleDTO dto) {
		mybatis.insert("Biz.createApplySchedule", dto);
	}
}
