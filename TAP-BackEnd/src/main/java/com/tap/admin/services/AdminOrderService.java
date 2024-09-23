package com.tap.admin.services;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tap.admin.dao.AdminOrderDAO;

@Service
public class AdminOrderService {
	
	@Autowired 
	private AdminOrderDAO adOrderdao;
	
	public List<HashMap<String, Object>> getAllOrders(){
		return adOrderdao.getAllOrders();
	}
	
	 // 트랜잭션 처리: 상태 업데이트 시 실패하면 롤백
	@Transactional
    public void updateDeliveryStatus(List<Integer> orderSeqs, String newStatus) {
        // DAO 메서드를 통해 주문 상태 업데이트
		System.out.println("서비스 "+ orderSeqs);
		System.out.println("상태 "+ newStatus);
		adOrderdao.updateOrderStatus(orderSeqs, newStatus);
    }
}
