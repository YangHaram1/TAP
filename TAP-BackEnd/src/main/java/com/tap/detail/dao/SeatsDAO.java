package com.tap.detail.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.detail.dto.SeatsDTO;

@Repository
public class SeatsDAO {
	
	@Autowired
	private SqlSession mybatis;
	
	public List<SeatsDTO> getPrice(int place_seq){
		return mybatis.selectList("Detail.getPriceByPlaceSeq",place_seq);
	}


}
