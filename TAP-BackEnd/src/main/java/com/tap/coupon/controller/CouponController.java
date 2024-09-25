package com.tap.coupon.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tap.coupon.dto.CouponDTO;
import com.tap.coupon.dto.CouponMemberDTO;
import com.tap.coupon.dto.CouponTypeDTO;
import com.tap.coupon.service.CouponService;
import com.tap.coupon.service.CouponTypeService;
import com.tap.members.dto.MembersGradeDTO;
import com.tap.members.service.MembersService;

@RestController
@RequestMapping("coupon")
public class CouponController {
	
	
	@Autowired
	private CouponTypeService ctserv;
	
	@Autowired
	private MembersService mserv;
	
	@Autowired
	private CouponService cserv;
	
	@PostMapping("/{couponOrder}")
	public ResponseEntity<String> insert(Principal principal,@PathVariable int couponOrder) throws Exception {
		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		
		boolean check=cserv.insert(username,couponOrder);
		
		if(check) {
			return ResponseEntity.ok("true");
		}
		else {
			return ResponseEntity.ok("false");
		}
		
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
	
	@GetMapping
	public ResponseEntity<List<CouponMemberDTO>> getTypeAll(Principal principal) throws Exception {

		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.ok(null);
		}
		String username =principal.getName();
		List<CouponMemberDTO> list =cserv.selectById(username);
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/type")
	public ResponseEntity<Map<String, Object>> getTypeAll(
			@RequestParam(name = "start", required = true, defaultValue = "1") int start,
			@RequestParam(name = "end", required = true, defaultValue = "5") int end,
			@RequestParam(name = "target", required = false, defaultValue = "") String target,
			@RequestParam(name = "keyword", required = false, defaultValue = "") String keyword) throws Exception {
		Map<String, Object> map= new HashMap<>();
		map.put("start", start);
		map.put("end", end);
		map.put("target", target);
		map.put("keyword", keyword);
		Map<String, Object> list =ctserv.selectAll(map);
		return ResponseEntity.ok(list);
	}
	@GetMapping("/type/members")
	public ResponseEntity<List<CouponTypeDTO>> getType(Principal principal) throws Exception{
		
		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.ok(null);
		}
		String username =principal.getName();
		MembersGradeDTO dto=mserv.getMemberInfo(username);
		
		List<CouponTypeDTO> list =ctserv.selectByOrder(dto.getGrade_order());	
		return ResponseEntity.ok(list);
	}
	
	
	@DeleteMapping("/type/{seq}")
	public ResponseEntity<String> deleteType(@PathVariable int seq) throws Exception {
		
		
		int result =ctserv.delete(seq);
		if(result>0) {
			return ResponseEntity.ok().build();
		}
		else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		
	}
	
}
