package com.tap.biz.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
}