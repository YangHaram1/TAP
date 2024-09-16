package com.tap.delivery.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.delivery.dto.DeliveryDTO;
import com.tap.delivery.service.deliveryService;

@RestController
@RequestMapping("/delivery")
public class deliveryController {
	
	@Autowired
	private deliveryService dsev;
	
	@PostMapping()
	public ResponseEntity<String> insert(@RequestBody DeliveryDTO dto,Principal principal) throws Exception {
		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		dto.setMember_id(username);
		dsev.insert(dto);
		return ResponseEntity.ok(null);
	}
	
	@GetMapping  ResponseEntity<List<DeliveryDTO>> get(Principal principal) throws Exception {
		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		List<DeliveryDTO> list =dsev.selectById(username);
		return ResponseEntity.ok(list);
	}
	
}
