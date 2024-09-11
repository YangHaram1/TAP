package com.tap.biz.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.biz.services.BizManageService;

@RestController
@RequestMapping("/biz/registration")
public class BizManageController {

	@Autowired
	private BizManageService bizManServ;
	
	// apply & 세부카테고리 & 장소 & files 4개 조인하기 
	@GetMapping
	public ResponseEntity<List<HashMap<String, Object>>> getAllProduct(){
		return ResponseEntity.ok(bizManServ.getAllProduct());
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
