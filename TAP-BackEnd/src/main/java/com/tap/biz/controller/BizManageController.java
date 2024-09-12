package com.tap.biz.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.biz.services.BizManageService;

@RestController
@RequestMapping("/biz/registration")
public class BizManageController {

	@Autowired
	private BizManageService bizManServ;
	
	// apply & 세부카테고리 & 장소 & files 4개 조인하기 
	@GetMapping("/waiting/{loginID}")
	public ResponseEntity<List<HashMap<String, Object>>> getAllWaiting(@PathVariable String loginID){
		System.out.println("id는 : "+ loginID);
		return ResponseEntity.ok(bizManServ.getAllWaiting(loginID));
	}
	
	@GetMapping("/recent/{loginID}")
	public ResponseEntity<List<HashMap<String, Object>>> getAllRecentApproved(@PathVariable String loginID){
		System.out.println("id는 : "+ loginID);
		return ResponseEntity.ok(bizManServ.getAllRecentApproved(loginID));
	}
	// 판매중 상품 
	@GetMapping("/current/${loginID}")
	public ResponseEntity<List<HashMap<String, Object>>> getAllCurrentApproved(@PathVariable String loginID){
		System.out.println("id는 : "+ loginID);
		return ResponseEntity.ok(bizManServ.getAllCurrentApproved(loginID));
	}
//	// 
////	@GetMapping("/categoryname")
////	public ResponseEntity<List<HashMap<String, Object>>> getAllCategory(){
////		return ResponseEntity.ok(bizManServ.getAllCategory());
////	}
////	@GetMapping("/place")
////	public ResponseEntity<List<HashMap<String, Object>>> getAllPlace(){
////		return ResponseEntity.ok(bizManServ.getAllPlace());
////	}
//	@GetMapping("/poster")
//	public ResponseEntity<List<HashMap<String, Object>>> getAllPoster(){
//		return ResponseEntity.ok(bizManServ.getAllPoster());
//	}
	
}
