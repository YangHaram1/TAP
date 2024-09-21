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
	// 오늘 할일 ====================
	// 오늘 신청된 상품 갯수
	public int getApplyCountToday() {
		return mybatis.selectOne("AdminDash.getApplyCountToday");
	}
	public int getSaleCountToday() {
		return mybatis.selectOne("AdminDash.getSaleCountToday");
	}
	public int getDeliveryCountToday() {
		return mybatis.selectOne("AdminDash.getDeliveryCountToday");
	}
	// 카테고리 별 주문 갯수 ============
	public List<HashMap<String, Object>> getOrderCountByCategory(){
		return mybatis.selectList("AdminDash.getOrderCountByCategory");
	}
}
