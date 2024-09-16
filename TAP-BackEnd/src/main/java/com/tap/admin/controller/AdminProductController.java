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
	public ResponseEntity<List<HashMap<String, Object>>> getCurrentProductsByCategory(@RequestParam String category) {
		List<HashMap<String, Object>> products = AdProServ.getCurrentProductsByCategory(category);
		return ResponseEntity.ok(products);
	}
	// 카테고리별로 예정 제품을 가져오기
	@GetMapping("/future")
	public ResponseEntity<List<HashMap<String, Object>>> getFutureProductsByCategory(@RequestParam String category) {
		List<HashMap<String, Object>> products = AdProServ.getFutureProductsByCategory(category);
		return ResponseEntity.ok(products);
	}
	// 카테고리별로 과거 제품을 가져오기
	@GetMapping("/past")
	public ResponseEntity<List<HashMap<String, Object>>> getPastProductsByCategory(@RequestParam String category) {
		List<HashMap<String, Object>> products = AdProServ.getPastProductsByCategory(category);
		return ResponseEntity.ok(products);
	}
	
	// 신청- 카테고리별 신청 대기 상품 갯수
	@GetMapping("/count/waiting")
	public ResponseEntity<Integer> getCountProductsWaiting(@RequestParam String category) {
		int count = AdProServ.getCountProductsWaiting(category);
		return ResponseEntity.ok(count);
	}
	// 신청 - 카테고리별 신청 결과 상품 갯수 - 최근 1달간. 
	@GetMapping("/count/result")
	public ResponseEntity<Integer> getCountProductsResult(@RequestParam String category) {
		int count = AdProServ.getCountProductsResult(category);
		System.out.println(count);
		System.out.println("카테고리"+category);
		return ResponseEntity.ok(count);
	}
	// 신청 대기 상품 리스트 - 카테고리 별로 
	@GetMapping("/waiting")
	public ResponseEntity<List<HashMap<String, Object>>> getWaitingProductsByCategory(@RequestParam String category) {
		List<HashMap<String, Object>> products = AdProServ.getWaitingProductsByCategory(category);
		return ResponseEntity.ok(products);
	}
	// 신청 결과 상품 리스트 - 카테고리 별로 , 최근 3개월분 
	@GetMapping("/result")
	public ResponseEntity<List<HashMap<String, Object>>> getResultProductsByCategory(@RequestParam String category) {
System.out.println(category);
		List<HashMap<String, Object>> products = AdProServ.getResultProductsByCategory(category);
		return ResponseEntity.ok(products);
	}
}
