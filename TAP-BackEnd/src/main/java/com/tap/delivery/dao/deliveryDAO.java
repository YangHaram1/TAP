package com.tap.delivery.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.delivery.dto.DeliveryDTO;
import com.tap.members.dto.MembersDeliveryDTO;

@Repository
public class deliveryDAO {

	@Autowired
	private SqlSession mybatis;
	
	public int insert(MembersDeliveryDTO dto) throws Exception{
		mybatis.insert("Delivery.insert",dto);
		return dto.getDelivery_seq();
	}

	public int insert(DeliveryDTO dto) {
		mybatis.insert("Delivery.insertByMypage",dto);
		return dto.getSeq();
	}

	public List<DeliveryDTO> selectById(String username) {
		
		return mybatis.selectList("Delivery.selectById",username);
	}

	public void deleteByArray(Integer integer) {
		mybatis.delete("Delivery.delete",integer);
		
	}

	public DeliveryDTO selectBySeq(String username) {
		// TODO Auto-generated method stub
		return mybatis.selectOne("Delivery.selectBySeq",username);
	}

}
