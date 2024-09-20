package com.tap.admin.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AdminOrderDAO {
	@Autowired
	private SqlSession mybatis;
	
	public List<HashMap<String, Object>> getAllOrders(){
		return mybatis.selectList("AdminOrder.getAllOrders");
	}
	
	public void updateOrderStatus(List<Integer> orderSeqs, String newStatus) {
		System.out.println("dao 번호" +orderSeqs);
		System.out.println("dao 상태"+ newStatus);
		
        for (Integer orderSeq : orderSeqs) {
        	
            HashMap<String, Object> params = new HashMap<>();
            params.put("orderSeq", orderSeq);
            params.put("newStatus", newStatus);
            	System.out.println("orderSeq" +orderSeq);
            	
            mybatis.update("AdminOrder.updateOrderStatusSingle", params);
        }
    }
}
