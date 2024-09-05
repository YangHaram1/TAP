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
	@GetMapping
	public ResponseEntity<List<HashMap<String, Object>>> getAllProduct(){
		return ResponseEntity.ok(bizManServ.getAllProduct());
	}
}
