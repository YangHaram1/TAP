package com.tap.detail.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.detail.dto.DescriptionDTO;

@Repository
public class DescriptionDAO {
	
	@Autowired
	private SqlSession mybatis;
	
	public DescriptionDTO getContent(int seq) {
		return mybatis.selectOne("Description.getOne",seq);
	}

}
