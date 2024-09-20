package com.tap.admin.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.admin.dto.AdminDashDTO;
import com.tap.admin.services.AdminDashService;
import com.tap.members.service.MembersService;

@RestController
@RequestMapping("/admin/dash")
public class AdminDashController {

	@Autowired 
	private AdminDashService AdDashServ;
	
	@Autowired
	private MembersService mserv;
	
	// 헤더에서 사업자 관리자 출력하기 ========================
	@GetMapping("/getID")
	public ResponseEntity<HashMap<String, Object>> getId(Principal principal){
		if (principal == null) {
			System.out.println("principal");
			return null;
		}
		String username = principal.getName();
		UserDetails user = mserv.loadUserByUsername(username);
		
		System.out.println("id는 : "+ user.getUsername());
		return ResponseEntity.ok(AdDashServ.getId(user.getUsername()));
	}
	
	// 오늘 처리할 일 ===========================
	// 오늘 등록된 상품 개수
	@GetMapping("/getapply")
	public ResponseEntity<Integer> getApplyCountToday(){
		int count = AdDashServ.getApplyCountToday();
		return ResponseEntity.ok(count);
	}
	@GetMapping("/getsale")
	public ResponseEntity<Integer> getSaleCountToday(){
		int count = AdDashServ.getSaleCountToday();
		return ResponseEntity.ok(count);
	}
	@GetMapping("/getdelivery")
	public ResponseEntity<Integer> getDeliveryCountToday(){
		int count = AdDashServ.getDeliveryCountToday();
		return ResponseEntity.ok(count);
	}
	// 오늘 처리한 일 ===========================
	@GetMapping("/getapprovedtoday")
	public ResponseEntity<Integer> getApprovedCountToday(){
		int count = AdDashServ.getApprovedCountToday();
		return ResponseEntity.ok(count);
	}
	@GetMapping("/getsaleapprovedtoday")
	public ResponseEntity<Integer> getSaleApprovedCountToday(){
		int count = AdDashServ.getSaleApprovedCountToday();
		return ResponseEntity.ok(count);
	}
	@GetMapping("/getdeliverytoday")
	public ResponseEntity<Integer> getDeliveryApprovedCountToday(){
		int count = AdDashServ.getDeliveryApprovedCountToday();
		return ResponseEntity.ok(count);
	}
	// 오늘 주문 총 금액
	@GetMapping("/gettotaltoday")
	public ResponseEntity<AdminDashDTO> getTotalToday(){
		AdminDashDTO dto = AdDashServ.getTotalToday();
		return ResponseEntity.ok(dto);
	}
	// 카테고리 별 주문건수 =======================
	@GetMapping("/getordercount")
	public ResponseEntity<List<HashMap<String, Object>>> getOrderCountByCategory(){
		return ResponseEntity.ok(AdDashServ.getOrderCountByCategory());
	}
	
}
