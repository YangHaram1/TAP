package com.tap.delivery.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.members.dto.MembersDeliveryDTO;

@Repository
public class deliveryDAO {

	@Autowired
	private SqlSession mybatis;
	
	public int insert(MembersDeliveryDTO dto) throws Exception{
		mybatis.insert("Delivery.insert",dto);
		return dto.getDelivery_seq();
	}

}
