package com.tap.admin.services;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.admin.dao.AdminOrderDAO;

@Service
public class AdminOrderService {
	
	@Autowired 
	private AdminOrderDAO adOrderdao;
	
	public List<HashMap<String, Object>> getAllOrders(){
		return adOrderdao.getAllOrders();
	}
}
