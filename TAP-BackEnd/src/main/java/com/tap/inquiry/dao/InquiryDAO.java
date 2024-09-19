package com.tap.inquiry.dao;

import java.util.List;

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
	public List<InquiryDTO> selectById(String username) {
	
		return mybatis.selectList("Inquiry.selectById",username);
	}
	public InquiryDTO selectBySeq(int seq) {
		return mybatis.selectOne("Inquiry.selectBySeq",seq);
	}
	public List<InquiryDTO> selectAll() {
		// TODO Auto-generated method stub
		return mybatis.selectList("Inquiry.selectAll");
	}

}
