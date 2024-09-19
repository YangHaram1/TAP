package com.tap.admin.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.admin.services.AdminDashService;

@RestController
@RequestMapping("/admin/dash")
public class AdminDashController {

	@Autowired 
	private AdminDashService AdDashServ;
	
	// 카테고리 별 주문건수
	@GetMapping("/getordercount")
	public ResponseEntity<List<HashMap<String, Object>>> getOrderCountByCategory(){
		return ResponseEntity.ok(AdDashServ.getOrderCountByCategory());
	}
	
}
