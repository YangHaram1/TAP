package com.tap.biz.controller;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.biz.dto.BizApplyDTO;
import com.tap.biz.services.BizService;

@RestController
@RequestMapping("/biz/application")
public class BizApplyController {
	@Autowired
	private BizService bizServ;
	
	@GetMapping("/category")
	public ResponseEntity<List<HashMap<String, Object>>> getAllCategory(){
		return ResponseEntity.ok(bizServ.getAllCategory());
	}
	@GetMapping("/subcategory")
	public ResponseEntity<List<HashMap<String, Object>>> getAllSubCategory(){
		return ResponseEntity.ok(bizServ.getAllSubCategory());
	}
	@GetMapping("/location")
	public ResponseEntity<List<HashMap<String, Object>>> getAllLocation(){
		return ResponseEntity.ok(bizServ.getAllLocation());
	}
	@GetMapping("/genre")
	public ResponseEntity<List<HashMap<String, Object>>> getAllGenre(){
		return ResponseEntity.ok(bizServ.getAllGenre());
	}
	@GetMapping("/team")
	public ResponseEntity<List<HashMap<String, Object>>> getAllTeam(){
		return ResponseEntity.ok(bizServ.getAllTeam());
	}
	@GetMapping("/teamlocation")
	public ResponseEntity<List<HashMap<String, Object>>> getAllTeamLocation(){
		return ResponseEntity.ok(bizServ.getAllTeamLocation());
	}
	
	// 상품 테이블에 insert POST
	@PostMapping
	public ResponseEntity<Void> insertEvent(@RequestBody BizApplyDTO dto){
		String id = dto.getId();
		int sub_category = dto.getSub_category_seq();
		String age_limit = dto.getAge_limit();
		Timestamp start_date = dto.getStart_date();
		System.out.println("id는? "+id +"카테고리: "+sub_category + "age_limit: "+ age_limit);
		System.out.println("시작날짜: "+ start_date);
//		bizServ.insertEvent(dto);
		return ResponseEntity.ok().build();
	}
}
