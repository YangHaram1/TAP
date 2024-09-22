package com.tap.order.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.order.dto.OrdersDTO;
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
	
	public List<String> getTime(Map<String,Object> map){
		return mybatis.selectList("Order.getTime",map);
	}
	
	public int getPoint(String id) {
		return mybatis.selectOne("Order.getPoint", id);
	}
	
	public int insertOrder(Map<String,Object> orderData) {
		orderData.put("order_seq", 0);
		mybatis.insert("Order.insertOrder", orderData);
		int seq = (int)orderData.get("order_seq");
		return seq;
	}
	
	public void insertBook(Map<String,Object> map) {
		mybatis.insert("Order.insertBook", map);
	}
	
	public void updatePoint(int point, String id) {
		Map<String, Object> map = new HashMap<>();
		map.put("id", id);
		map.put("point", point);
		mybatis.update("Order.updatePoint", map);
	}
	
	public List<OrdersDTO> getOrder(Map<String,Object> map) {
		return mybatis.selectList("Order.getOrder", map);
	}
	
	public int insertReview(Map<String,Object> data) {
		data.put("review_seq", 0);	
		mybatis.insert("Order.insertReview", data);
		int seq = (int)data.get("review_seq");
		System.out.println(seq);
		return seq;
	}
	
	public void insertStar(Map<String,Object> map) {
		mybatis.insert("Order.insertStar", map);
	}
	
	public void insertExcite(Map<String,Object> map) {
		mybatis.insert("Order.insertExcite", map);
	}
	
	
}
