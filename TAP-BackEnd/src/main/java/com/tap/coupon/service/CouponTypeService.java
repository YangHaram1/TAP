package com.tap.coupon.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.coupon.dao.CouponTypeDAO;
import com.tap.coupon.dto.CouponTypeDTO;
import com.tap.coupon.dto.CouponTypeGradeDTO;

@Service
public class CouponTypeService {

	@Autowired
	private CouponTypeDAO ctdao;

	
	public void insert(CouponTypeDTO dto) throws Exception{
		ctdao.insert(dto);
	}

	public Map<String, Object> selectAll(Map<String, Object> map) throws Exception{
		Map<String, Object> result =new HashMap<>();
		result.put("list", ctdao.selectAll(map));
		result.put("count", ctdao.getCount(map));
		
		return result;
	}

	public int delete(int seq) throws Exception{
		return ctdao.delete(seq);
	}

	public List<CouponTypeDTO> selectByOrder(int grade_order) {
		return ctdao.selectByOrder(grade_order);
	}
	
	public List<CouponTypeGradeDTO> selectAllCouponGrade(){
		return ctdao.selectAllCouponGrade();
	}
	
	
}
