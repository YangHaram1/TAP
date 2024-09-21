package com.tap.admin.services;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.admin.dao.AdminDashDAO;

@Service
public class AdminDashService {

	@Autowired
	private AdminDashDAO adDashdao;
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
	// =======================
	public List<HashMap<String, Object>> getOrderCountByCategory(){
		return adDashdao.getOrderCountByCategory();
	}
}
