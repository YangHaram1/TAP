package com.tap.biz.services;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.biz.dao.BizManageDAO;

@Service
public class BizManageService {
 
	@Autowired
	private BizManageDAO bizMandao;
	
	public List<HashMap<String, Object>> getAllCurrentApproved(String id){
		return bizMandao.getAllCurrentApproved(id);
	}
	public List<HashMap<String, Object>> getAllFutureApproved(String id){
		return bizMandao.getAllFutureApproved(id);
	}
	public List<HashMap<String, Object>> getAllPast(String id){
		return bizMandao.getAllPast(id);
	}
	
	public List<HashMap<String, Object>> getAllWaiting(String id){
		return bizMandao.getAllWaiting(id);
	}
	public List<HashMap<String, Object>> getAllRecentApproved(String id){
		return bizMandao.getAllRecentApproved(id);
	}
	public void cancelRegistration(Long applicationSeq) {
        bizMandao.cancelRegistration(applicationSeq);
    }
	// 세일 신청 
	public List<HashMap<String, Object>> getAllSaleWaiting(String id){
		return bizMandao.getAllSaleWaiting(id);
	}
	public void cancelSaleRegistration(Long applicationSeq) {
        bizMandao.cancelSaleRegistration(applicationSeq);
    }
	public List<HashMap<String, Object>> getAllSaleRecentApproved(String id){
		return bizMandao.getAllSaleRecentApproved(id);
	}
	
	
	
	
	
	

	public List<HashMap<String,Object>> getAllPoster(){
		return bizMandao.getAllPoster();
	}
}
