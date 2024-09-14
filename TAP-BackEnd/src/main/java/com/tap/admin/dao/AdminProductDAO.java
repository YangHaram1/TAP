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
	
	public List<HashMap<String, Object>> getCurrentProductsByCategory(String category){
		return mybatis.selectList("AdminProduct.getCurrentProductsByCategory", category);
	}
	public List<HashMap<String, Object>> getFutureProductsByCategory(String category){
		return mybatis.selectList("AdminProduct.getFutureProductsByCategory", category);
	}
	public List<HashMap<String, Object>> getPastProductsByCategory(String category){
		return mybatis.selectList("AdminProduct.getPastProductsByCategory", category);
	}
}
