package com.tap.admin.services;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tap.admin.dao.AdminBizMemberDAO;
import com.tap.members.dto.MembersDTO;

@Service
public class AdminBizMemberService {
	@Autowired
	private AdminBizMemberDAO adminbizMemdao;
	
	public List<HashMap<String, Object>> getAllBizMem(){
		return adminbizMemdao.getAllBizMem();
	}
	
	// 기업 가입 승인 처리 
	@Transactional
    public void updateDeliveryStatus(List<String> orderSeqs, String newStatus) {
        // DAO 메서드를 통해 주문 상태 업데이트
		System.out.println("서비스 "+ orderSeqs);
		System.out.println("상태 "+ newStatus);
		adminbizMemdao.updateOrderStatus(orderSeqs, newStatus);
    }
	
	   // 검색 서비스
    public List<HashMap<String, Object>> searchBizMem(String keyword, Integer shippingStatus) {
        // DAO 메서드를 호출하여 검색 결과를 가져옴
        return adminbizMemdao.searchBizMem(keyword, shippingStatus);
    }

	
}
