package com.tap.delivery.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.delivery.dto.DeliveryDTO;
import com.tap.delivery.service.deliveryService;
import com.tap.members.dto.MembersGradeDTO;

@RestController
@RequestMapping("/delivery")
public class deliveryController {
	
	@Autowired
	private deliveryService dsev;
	
	@PostMapping()
	public ResponseEntity<String> insert(DeliveryDTO dto) throws Exception {
		
		return ResponseEntity.ok(null);
	}
	
}
