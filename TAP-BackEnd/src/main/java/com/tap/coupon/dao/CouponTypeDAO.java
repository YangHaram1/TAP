package com.tap.coupon.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.coupon.dto.CouponTypeDTO;

@Repository
public class CouponTypeDAO {
	
	@Autowired
	private SqlSession mybatis;

	public void insert(CouponTypeDTO dto) {
		mybatis.insert("CouponType.insert",dto);
	}

	public List<CouponTypeDTO> selectAll() {
		return mybatis.selectList("CouponType.selectAll");
	}
}
