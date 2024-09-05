package com.tap.biz.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.biz.services.BizService;

@RestController
@RequestMapping("/biz/application")
public class BizController {
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
}
