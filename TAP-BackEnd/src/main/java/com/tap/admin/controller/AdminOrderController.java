package com.tap.admin.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.admin.services.AdminOrderService;

@RestController
@RequestMapping("/admin/orders")
public class AdminOrderController {

	@Autowired
	private AdminOrderService AdOrderServ;
	

	// 발송완료 제외하고 주문 가져오기 
	@GetMapping
	public ResponseEntity<List<HashMap<String, Object>>> getAllOrders(){
		return ResponseEntity.ok(AdOrderServ.getAllOrders());
	}
	
	
}


