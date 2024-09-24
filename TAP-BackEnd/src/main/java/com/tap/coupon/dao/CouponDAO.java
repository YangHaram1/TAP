package com.tap.coupon.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.coupon.dto.CouponDTO;
import com.tap.coupon.dto.CouponMemberDTO;

@Repository
public class CouponDAO {
	@Autowired
	private SqlSession mybatis;

	public void insert(CouponDTO item) {
		mybatis.insert("Coupon.insert",item);
		
	}
	
	public List<CouponMemberDTO> selectById(String id) {
		return mybatis.selectList("Coupon.selectById",id);
	}
}
