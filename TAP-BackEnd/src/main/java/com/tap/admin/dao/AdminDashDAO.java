package com.tap.admin.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.admin.dto.AdminDashDTO;

@Repository
public class AdminDashDAO {

	@Autowired
	private SqlSession mybatis;
	
	public HashMap<String, Object> getId(String id){
		return mybatis.selectOne("AdminDash.getId", id);
	}
	
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
	// 오늘 Done =======================
	public int getApprovedCountToday() {
		return mybatis.selectOne("AdminDash.getApprovedCountToday");
	}
	public int getSaleApprovedCountToday() {
		return mybatis.selectOne("AdminDash.getSaleApprovedCountToday");
	}
	public int getDeliveryApprovedCountToday() {
		return mybatis.selectOne("AdminDash.getDeliveryApprovedCountToday");
	}
	// 오늘 주문 총 금액
	public AdminDashDTO getTotalToday() {
		return mybatis.selectOne("AdminDash.getTotalToday");
	}
	
	// 환불
	public HashMap<String, Object> getRefundToday(){
		return mybatis.selectOne("AdminDash.getRefundToday");
	}
	
	// 카테고리 별 주문 갯수 ============
	public List<HashMap<String, Object>> getOrderCountByCategory(){
		return mybatis.selectList("AdminDash.getOrderCountByCategory");
	}
}
