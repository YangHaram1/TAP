package com.tap.coupon.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.coupon.dto.CouponTypeDTO;
import com.tap.coupon.dto.CouponTypeGrade;

@Repository
public class CouponTypeDAO {
	
	@Autowired
	private SqlSession mybatis;

	public void insert(CouponTypeDTO dto) throws Exception{
		mybatis.insert("CouponType.insert",dto);
	}

	public List<CouponTypeGrade> selectAll(Map<String, Object> map) throws Exception{
		return mybatis.selectList("CouponType.selectAll",map);
	}
	
	public int getCount(Map<String, Object> map) throws Exception{
		return mybatis.selectOne("CouponType.getCount",map);
	}

	public int delete(int seq) throws Exception{
		
		return mybatis.delete("CouponType.delete",seq);
	}
}
