package com.tap.admin.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.admin.dto.AdminLogDTO;
import com.tap.admin.dto.AdminLogSearchDTO;



@Repository
public class AdminLogDAO {

	@Autowired
	private SqlSession mybatis;
	
	public void insertLog(AdminLogDTO logdto) {
		mybatis.insert("AdminLog.insertLog", logdto);
	}
	
	public List<AdminLogDTO> getAllLog(){
		return mybatis.selectList("AdminLog.getAllLog");
	}
	public List<AdminLogDTO> getSearchLog(AdminLogSearchDTO logsearchdto){
		return mybatis.selectList("AdminLog.getSearchLog", logsearchdto);
	}
}
