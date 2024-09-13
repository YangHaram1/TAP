package com.tap.admin.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AdminProductDAO {
	@Autowired
	private SqlSession mybatis;
	
	public List<HashMap<String, Object>> getAllCurrentProducts(){
		return mybatis.selectList("AdminProduct.getAllCurrentProducts");
	}
	public List<HashMap<String, Object>> getAllPastProducts(){
		return mybatis.selectList("AdminProduct.getAllPastProducts");
	}
	public List<HashMap<String, Object>> getAllFutureProducts(){
		return mybatis.selectList("AdminProduct.getAllFutureProducts");
	}
}
