package com.tap.inquiry.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.inquiry.dto.InquiryDTO;

@Repository
public class InquiryDAO {

	@Autowired
	private SqlSession mybatis;
	public int insert(InquiryDTO dto) {
		 mybatis.insert("Inquiry.insert",dto);
		 return dto.getSeq();
	}

}
