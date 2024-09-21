package com.tap.admin.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AdminBizMemberDAO {
	@Autowired
	private SqlSession mybatis;
	
	public List<HashMap<String, Object>> getAllBizMem(){
		return mybatis.selectList("AdminBizMem.getAllBizMem");
	}
	
	public void updateOrderStatus(List<String> orderSeqs, String newStatus) {
		System.out.println("dao 번호" +orderSeqs);
		System.out.println("dao 상태"+ newStatus);
		
        for (String orderSeq : orderSeqs) {
        	
            HashMap<String, Object> params = new HashMap<>();
            params.put("orderSeq", orderSeq);
            params.put("newStatus", newStatus);
            	System.out.println("orderSeq" +orderSeq);
            	
           mybatis.update("AdminBizMem.updateOrderStatusSingle", params);
        }
    }
	
// 검색 메서드 추가 (키워드와 가입 상태로 필터링)
    public List<HashMap<String, Object>> searchBizMem(String keyword, Integer shippingStatus) {
        HashMap<String, Object> params = new HashMap<>();
        params.put("keyword", keyword);

        // shippingStatus가 null인 경우를 처리
        if (shippingStatus != null) {
            params.put("shippingStatus", shippingStatus);
        }

        // MyBatis 쿼리 실행
        return mybatis.selectList("AdminBizMem.searchBizMem", params);
    }
}
