package com.tap.admin.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	// 판매 갯수
	public int getCountCurrent(String category){
		return mybatis.selectOne("AdminProduct.getCountCurrent", category);
	}
	public int getCountFuture(String category){
		return mybatis.selectOne("AdminProduct.getCountFuture", category);
	}
	public int getCountPast(String category){
		return mybatis.selectOne("AdminProduct.getCountPast", category);
	}
	
	
	// ----------------------
	// Sale 상품 신청 갯수 
	public int getCountSaleWaiting(String category){
		return mybatis.selectOne("AdminProduct.getCountSaleWaiting", category);
	}
	public int getCountSaleResult(String category){
		return mybatis.selectOne("AdminProduct.getCountSaleResult", category);
	}
	// Sale 신청 대기 상품 리스트 - 카테고리 별로
	public List<HashMap<String, Object>> getWaitingSaleByCategory(String category){
		return mybatis.selectList("AdminProduct.getWaitingSaleByCategory", category);
	}
	// Sale 신청 결과 상품 리스트 - 카테고리 별로 , 최근 3개월분 
	public List<HashMap<String, Object>> getResultSaleByCategory(String category){
		return mybatis.selectList("AdminProduct.getResultSaleByCategory", category);
	}
	//  Sale application_seq에 따른 상품 상세 정보 가져오기 
	public List<HashMap<String, Object>> getSaleDetail(String application_seq){
		return mybatis.selectList("AdminProduct.getSaleDetail", application_seq);
	}
	
	// Sale application_seq 신청 상품 승인처리해주기. 
	public int approveSale(String applicationSeq){
		return mybatis.update("AdminProduct.approveSale", applicationSeq);
	}
	
	// -------------------
	// 상품 신청 갯수 
	public int getCountProductsWaiting(String category){
		return mybatis.selectOne("AdminProduct.getCountProductsWaiting", category);
	}
	public int getCountProductsResult(String category){
		return mybatis.selectOne("AdminProduct.getCountProductsResult", category);
	}
	// 신청 대기 상품 리스트 - 카테고리 별로
	public List<HashMap<String, Object>> getWaitingProductsByCategory(String category){
		return mybatis.selectList("AdminProduct.getWaitingProductsByCategory", category);
	}
	// 신청 결과 상품 리스트 - 카테고리 별로 , 최근 3개월분 
	public List<HashMap<String, Object>> getResultProductsByCategory(String category){
		return mybatis.selectList("AdminProduct.getResultProductsByCategory", category);
	}
	
	//  application_seq에 따른 상품 상세 정보 가져오기 
	public List<HashMap<String, Object>> getProductDetails(String application_seq){
		return mybatis.selectList("AdminProduct.getProductDetails", application_seq);
	}
	
	// application_seq 신청 상품 승인처리해주기. 
	public int approveProduct(String applicationSeq){
		return mybatis.update("AdminProduct.approveProduct", applicationSeq);
	}
	// 상품 반려 처리
	public int rejectProduct(String applicationSeq, String rejectReason){
		Map<String, Object> params = new HashMap<>();
	    params.put("applicationSeq", applicationSeq);
	    params.put("rejectReason", rejectReason);
	    
	    return mybatis.update("AdminProduct.rejectProduct", params);
	}
}
