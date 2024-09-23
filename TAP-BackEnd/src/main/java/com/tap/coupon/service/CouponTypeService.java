package com.tap.coupon.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.coupon.dao.CouponTypeDAO;
import com.tap.coupon.dto.CouponTypeDTO;

@Service
public class CouponTypeService {

	@Autowired
	private CouponTypeDAO ctdao;

	
	public void insert(CouponTypeDTO dto) {
		ctdao.insert(dto);
	}

	public Map<String, Object> selectAll(Map<String, Object> map) {
		Map<String, Object> result =new HashMap<>();
		result.put("list", ctdao.selectAll(map));
		result.put("count", ctdao.getCount(map));
		
		return result;
	}

	public int delete(int seq) {
		return ctdao.delete(seq);
	}
	
	
}
