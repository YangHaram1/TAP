package com.tap.admin.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.admin.services.BizMemService;

@RestController
@RequestMapping("/admin/bizmem")
public class AdminBizMemberController {

	@Autowired
	private BizMemService bizMemServ;
	@GetMapping
	public ResponseEntity<List<HashMap<String, Object>>> getAllBizMem(){
		return ResponseEntity.ok(bizMemServ.getAllBizMem());
	}
}
