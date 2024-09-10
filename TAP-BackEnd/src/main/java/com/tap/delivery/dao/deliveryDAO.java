package com.tap.delivery.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.delivery.dto.DeliveryDTO;

@Repository
public class deliveryDAO {

	@Autowired
	private SqlSession mybatis;
	
	public int insert(DeliveryDTO dto) throws Exception{
		return mybatis.insert("Delivery.insert",dto);
	}

}
