package com.tap.admin.services;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.admin.dao.AdminProductDAO;

@Service
public class AdminProductService {
	@Autowired 
	private AdminProductDAO adProdao;
	
	public List<HashMap<String, Object>> getCurrentProductsByCategory(String category){
		return adProdao.getCurrentProductsByCategory(category);
	}
	public List<HashMap<String, Object>> getFutureProductsByCategory(String category){
		return adProdao.getFutureProductsByCategory(category);
	}
	public List<HashMap<String, Object>> getPastProductsByCategory(String category){
		return adProdao.getPastProductsByCategory(category);
	}
	//----------------
	// 할인 신청 갯수 
	public int getCountSaleWaiting(String category){
		return adProdao.getCountSaleWaiting(category);
	}
	public int getCountSaleResult(String category){
		return adProdao.getCountSaleResult(category);
	}
	// Sale 신청 대기 상품 리스트 - 카테고리 별로 
	public List<HashMap<String, Object>> getWaitingSaleByCategory(String category){
		return adProdao.getWaitingSaleByCategory(category);
	}
	// Sale 신청 결과 상품 리스트 - 카테고리 별로 , 최근 3개월분 
	public List<HashMap<String, Object>> getResultSaleByCategory(String category){
		return adProdao.getResultSaleByCategory(category);
	}
	// Sale  application_seq에 따른 상품 상세 정보 가져오기 
	public List<HashMap<String, Object>> getSaleDetail(String application_seq){
		return adProdao.getSaleDetail(application_seq);
	}
	// Sale 상품 승인 처리하기 
	public int approveSale(String applicationSeq){
		return adProdao.approveSale(applicationSeq);
	}
	
	//----------------
	// 상품 신청 갯수 
	public int getCountProductsWaiting(String category){
		return adProdao.getCountProductsWaiting(category);
	}
	public int getCountProductsResult(String category){
		return adProdao.getCountProductsResult(category);
	}
	// 신청 대기 상품 리스트 - 카테고리 별로 
	public List<HashMap<String, Object>> getWaitingProductsByCategory(String category){
		return adProdao.getWaitingProductsByCategory(category);
	}
	// 신청 결과 상품 리스트 - 카테고리 별로 , 최근 3개월분 
	public List<HashMap<String, Object>> getResultProductsByCategory(String category){
		return adProdao.getResultProductsByCategory(category);
	}
	
	//  application_seq에 따른 상품 상세 정보 가져오기 
	public List<HashMap<String, Object>> getProductDetails(String application_seq){
		return adProdao.getProductDetails(application_seq);
	}
	// 상품 승인 처리하기 
	public int approveProduct(String applicationSeq){
		return adProdao.approveProduct(applicationSeq);
	}
	
	
}