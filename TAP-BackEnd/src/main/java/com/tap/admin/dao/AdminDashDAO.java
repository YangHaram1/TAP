package com.tap.admin.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AdminDashDAO {

	@Autowired
	private SqlSession mybatis;
	
	public List<HashMap<String, Object>> getOrderCountByCategory(){
		return mybatis.selectList("AdminDash.getOrderCountByCategory");
	}
}
