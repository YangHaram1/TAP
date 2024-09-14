package com.tap.biz.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.biz.services.BizManageService;
import com.tap.members.service.MembersService;

@RestController
@RequestMapping("/biz/registration")
public class BizManageController {

	@Autowired
	private BizManageService bizManServ;
	
	@Autowired
	private MembersService mserv;
	// 판매중 상품 
	@GetMapping("/current")
	public ResponseEntity<List<HashMap<String, Object>>> getAllCurrentApproved(Principal principal){
		if (principal == null) {
			System.out.println("principal");
			return null;

		}
		String username = principal.getName();
		UserDetails user = mserv.loadUserByUsername(username);
		
		
		System.out.println("id는 : "+ user.getUsername());
		return ResponseEntity.ok(bizManServ.getAllCurrentApproved(user.getUsername()));
	}
	// 판매 예정 상품
	@GetMapping("/future")
	public ResponseEntity<List<HashMap<String, Object>>> getAllFutureApproved(Principal principal){
		if (principal == null) {
			System.out.println("principal");
			return null;

		}
		String username = principal.getName();
		UserDetails user = mserv.loadUserByUsername(username);
		
		
		System.out.println("id는 : "+ user.getUsername());
		return ResponseEntity.ok(bizManServ.getAllFutureApproved(user.getUsername()));
	}
	// 판매 종료 상품
		@GetMapping("/past")
		public ResponseEntity<List<HashMap<String, Object>>> getAllPastApproved(Principal principal){
			if (principal == null) {
				System.out.println("principal");
				return null;

			}
			String username = principal.getName();
			UserDetails user = mserv.loadUserByUsername(username);
			
			
			System.out.println("id는 : "+ user.getUsername());
			return ResponseEntity.ok(bizManServ.getAllPastApproved(user.getUsername()));
		}
	
	
	// apply & 세부카테고리 & 장소 & files 4개 조인하기 
	@GetMapping("/waiting")
	public ResponseEntity<List<HashMap<String, Object>>> getAllWaiting(Principal principal){
		if (principal == null) {
			System.out.println("principal");
			return null;

		}
		String username = principal.getName();
		UserDetails user = mserv.loadUserByUsername(username);
		
		System.out.println("id는 : "+ user.getUsername());
		return ResponseEntity.ok(bizManServ.getAllWaiting(user.getUsername()));
	}
	
	@GetMapping("/recent")
	public ResponseEntity<List<HashMap<String, Object>>> getAllRecentApproved(Principal principal){
		if (principal == null) {
			System.out.println("principal");
			return null;

		}
		String username = principal.getName();
		UserDetails user = mserv.loadUserByUsername(username);
		String id = user.getUsername();
		
		System.out.println("id는 : "+ user.getUsername());
		return ResponseEntity.ok(bizManServ.getAllRecentApproved(user.getUsername()));
	}
	
	 // 신청 취소를 업데이트하는 API
    @PutMapping("/{applicationSeq}")
    public ResponseEntity<Void> cancelRegistration(
        @PathVariable("applicationSeq") Long applicationSeq) {
        bizManServ.cancelRegistration(applicationSeq);
        return ResponseEntity.ok().build();
        
    }

	
}
