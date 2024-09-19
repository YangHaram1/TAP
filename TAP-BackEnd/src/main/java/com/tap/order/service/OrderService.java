package com.tap.order.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.order.dao.OrderDAO;
import com.tap.order.dto.PlaceAndSectionDTO;
import com.tap.order.dto.SectionInnerDataDTO;

@Service
public class OrderService {
	
	@Autowired
	private OrderDAO oDao;
	
	public List<PlaceAndSectionDTO> getSection(int placeSeq){
		return oDao.getSection(placeSeq);
	}
	
	public List<SectionInnerDataDTO> getInnerData(int placeSeq){
		return oDao.getInnerData(placeSeq);
	}
	
	public List<Map<String, Object>> getDate(int seq){
		return oDao.getDate(seq);
	}
	
	public List<String> getTime(Map<String,Object> map){
		return oDao.getTime(map);
	}
}
