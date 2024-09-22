package com.tap.admin.services;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.admin.dao.AdminDashDAO;
import com.tap.admin.dto.AdminDashDTO;

@Service
public class AdminDashService {

	@Autowired
	private AdminDashDAO adDashdao;
	
	public HashMap<String, Object> getId(String id){
		return adDashdao.getId(id);
	}
	// 오늘 할일 ================
	// 상품등록 갯수 today
	public int getApplyCountToday(){
		return adDashdao.getApplyCountToday();
	}
	public int getSaleCountToday(){
		return adDashdao.getSaleCountToday();
	}
	public int getDeliveryCountToday(){
		return adDashdao.getDeliveryCountToday();
	}
	// 오늘 Done =====================
	public int getApprovedCountToday(){
		return adDashdao.getApprovedCountToday();
	}
	public int getSaleApprovedCountToday(){
		return adDashdao.getSaleApprovedCountToday();
	}
	public int getDeliveryApprovedCountToday(){
		return adDashdao.getDeliveryApprovedCountToday();
	}
	// 오늘 주문 금액
	public AdminDashDTO getTotalToday() {
		return adDashdao.getTotalToday();
	}
	// 환불
	public HashMap<String, Object> getRefundToday(){
		return adDashdao.getRefundToday();
	}
	// =======================
	public List<HashMap<String, Object>> getOrderCountByCategory(){
		return adDashdao.getOrderCountByCategory();
	}
}
