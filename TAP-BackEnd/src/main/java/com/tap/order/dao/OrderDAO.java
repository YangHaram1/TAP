package com.tap.order.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.order.dto.PlaceAndSectionDTO;
import com.tap.order.dto.SectionInnerDataDTO;

@Repository
public class OrderDAO {
	
	@Autowired
	private SqlSession mybatis;
	
	public List<PlaceAndSectionDTO> getSection(int placeSeq){
		return mybatis.selectList("Order.getSection",placeSeq);
	}
	
	public List<SectionInnerDataDTO> getInnerData(int placeSeq){
		return mybatis.selectList("Order.getInnerData",placeSeq);
	}
	
	public List<Map<String, Object>> getDate(int seq){
		return mybatis.selectList("Order.getDate",seq);
	}
	
}
