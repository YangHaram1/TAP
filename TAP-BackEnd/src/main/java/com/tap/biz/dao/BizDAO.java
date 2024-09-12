package com.tap.biz.dao;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.biz.dto.BizApplyDTO;
import com.tap.biz.dto.CastingDataDTO;
import com.tap.biz.dto.TestClobDTO;
import com.tap.biz.dto.TotalScheduleDTO;
import com.tap.files.dto.FilesDTO;

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
	public void createApplyCasting(CastingDataDTO dto) {
		mybatis.insert("Biz.createApplyCasting",dto);
	}
	public void createApplyNotice(String content, int applicationSeq) {
		Map<String, Object> params = new HashMap<>();
		params.put("event_popup_content", content);
		params.put("application_seq", applicationSeq);
		mybatis.insert("Biz.createApplyNotice", params);
	}
	public void createApplyFilesMain(FilesDTO main_poster, int applicationSeq) {
		Map<String, Object> params = new HashMap<>();
		params.put("files_oriname", main_poster.getFiles_oriname());
		params.put("files_sysname", main_poster.getFiles_sysname());
		params.put("files_parent_seq", applicationSeq);
		mybatis.insert("Biz.createApplyFilesMain", params);
	}
	public void createApplyDescription(String detailed, int applicationSeq) {
		Map<String, Object> params = new HashMap<>();
		params.put("detailed_description", detailed);
		params.put("application_seq", applicationSeq);
		mybatis.insert("Biz.createApplyDescription", params);
	}
	
}
