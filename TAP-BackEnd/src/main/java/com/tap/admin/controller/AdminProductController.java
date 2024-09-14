package com.tap.admin.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tap.admin.services.AdminProductService;

@RestController
@RequestMapping("/admin/products")
public class AdminProductController {
	@Autowired
	private AdminProductService AdProServ;
	
	// 카테고리별로 현재 제품을 가져오기
	@GetMapping("/current")
	public ResponseEntity<List<HashMap<String, Object>>> getProductsByCategory(@RequestParam String category) {
		List<HashMap<String, Object>> products = AdProServ.getProductsByCategory(category);
		return ResponseEntity.ok(products);
	}
}
