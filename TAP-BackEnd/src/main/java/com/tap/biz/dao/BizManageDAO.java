package com.tap.biz.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BizManageDAO {
	@Autowired
	private SqlSession mybatis;
	// 판매중
	public List<HashMap<String, Object>> getAllCurrentApproved(String id){
		return mybatis.selectList("BizManage.getAllCurrentApproved", id);
	}
	// 판매예정
	public List<HashMap<String, Object>> getAllFutureApproved(String id){
		return mybatis.selectList("BizManage.getAllFutureApproved", id);
	}
	// 판매종료 상품 출력
	public List<HashMap<String, Object>> getAllPast(String id){
		return mybatis.selectList("BizManage.getAllPast", id);
	}
	
	// 승인 대기 목록
	public List<HashMap<String, Object>> getAllWaiting(String id){
		return mybatis.selectList("BizManage.getAllWaiting", id);
	}
	// 최근 승인 된 목록
	public List<HashMap<String, Object>> getAllRecentApproved(String id){
		return mybatis.selectList("BizManage.getAllRecentApproved", id);
	}
	// 등록 취소한 목록
	public void cancelRegistration(Long applicationSeq) {
		mybatis.update("BizManage.cancelRegistration", applicationSeq);
	}
	// 세일 신청
	public List<HashMap<String, Object>> getAllSaleWaiting(String id){
		return mybatis.selectList("BizManage.getAllSaleWaiting", id);
	}
	public void cancelSaleRegistration(Long applicationSeq) {
		mybatis.update("BizManage.cancelSaleRegistration", applicationSeq);
	}
	public List<HashMap<String, Object>> getAllSaleRecentApproved(String id){
		return mybatis.selectList("BizManage.getAllSaleRecentApproved", id);
	}
	
	
	public List<HashMap<String, Object>> getAllPoster(){
		return mybatis.selectList("BizManage.getAllPoster");
	}
}
