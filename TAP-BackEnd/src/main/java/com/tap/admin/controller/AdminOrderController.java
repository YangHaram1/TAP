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
import org.springframework.web.bind.annotation.RestController;

import com.tap.admin.services.AdminOrderService;

@RestController
@RequestMapping("/admin/orders")
public class AdminOrderController {

	@Autowired
	private AdminOrderService AdOrderServ;
	

	// 발송완료 제외하고 주문 가져오기 
	@GetMapping
	public ResponseEntity<List<HashMap<String, Object>>> getAllOrders(){
		return ResponseEntity.ok(AdOrderServ.getAllOrders());
	}
	
	 // 주문 상태 업데이트 (발송 처리)
    @PutMapping("/update_status")
    public ResponseEntity<String> updateDelivery(@RequestBody Map<String, Object> request) {
    	try {
            List<Integer> orderSeqs = (List<Integer>) request.get("orderSeqs"); // 주문 번호 목록
            String newStatus = (String) request.get("newStatus"); // 새로운 상태 (예: 발송 완료)

            // 서비스에서 상태 업데이트
             AdOrderServ.updateDeliveryStatus(orderSeqs, newStatus);

            return ResponseEntity.ok("주문 상태가 성공적으로 업데이트되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("주문 상태 업데이트 중 오류가 발생했습니다.");
        }
    	
    }
	
}


