package com.tap.coupon.service;

import java.util.List;

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

	public List<CouponTypeDTO> selectAll() {
		return ctdao.selectAll();
	}
	
	
}
