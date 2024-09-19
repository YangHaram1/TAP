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
	
	public List<HashMap<String, Object>> getOrderCountByCategory(){
		return adDashdao.getOrderCountByCategory();
	}
}
