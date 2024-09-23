package com.tap.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tap.admin.services.AdminBizMemberService;
import com.tap.members.dto.MembersDTO;

@RestController
@RequestMapping("/admin/bizmem")
public class AdminBizMemberController {

	@Autowired
	private AdminBizMemberService adminbizMemServ;
	
	@GetMapping
	public ResponseEntity<List<HashMap<String, Object>>> getAllBizMem(){
		return ResponseEntity.ok(adminbizMemServ.getAllBizMem());
	}
	
	// 기업 가입 승인 처리
	@PutMapping("/update_status")
	public ResponseEntity<String> updateDelivery(@RequestBody Map<String, Object> request) {
    	try {
            List<String> orderSeqs = (List<String>) request.get("orderSeqs"); // 주문 번호 목록
            String newStatus = (String) request.get("newStatus"); // 새로운 상태 (예: 발송 완료)

            System.out.println(orderSeqs);
            System.out.println(newStatus);
            adminbizMemServ.updateDeliveryStatus(orderSeqs, newStatus);

            return ResponseEntity.ok("주문 상태가 성공적으로 업데이트되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("주문 상태 업데이트 중 오류가 발생했습니다.");
        } 	
	   }
	
    // 검색 기능
    @GetMapping("/search")
    public ResponseEntity<List<HashMap<String, Object>>> searchBizMem(
            @RequestParam String keyword,
            @RequestParam(required = false) Integer shippingStatus) {
        List<HashMap<String, Object>> result = adminbizMemServ.searchBizMem(keyword, shippingStatus);
        return ResponseEntity.ok(result);
    }
	
}
 