package com.tap.coupon.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.coupon.dto.CouponDTO;
import com.tap.coupon.dto.CouponTypeDTO;
import com.tap.coupon.service.CouponTypeService;

@RestController
@RequestMapping("coupon")
public class CouponController {
	
	
	@Autowired
	private CouponTypeService ctserv;
	
	
	@PostMapping
	public ResponseEntity<String> insert(@RequestBody CouponDTO dto,Principal principal) throws Exception {
		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		dto.setMember_id(username);
		
		return ResponseEntity.ok(String.valueOf(dto.getSeq()));
	}
	
	
	@PostMapping("/type")
	public ResponseEntity<String> insertType(@RequestBody CouponTypeDTO dto,Principal principal) throws Exception {
		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.ok(null);
		}
		ctserv.insert(dto);
		
		return ResponseEntity.ok(String.valueOf(dto.getSeq()));
	}
	
	@GetMapping("/type")
	ResponseEntity<List<CouponTypeDTO>> getType(Principal principal) throws Exception {
		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.ok(null);
		}
		List<CouponTypeDTO> list =ctserv.selectAll();
		return ResponseEntity.ok(list);
	}
}
