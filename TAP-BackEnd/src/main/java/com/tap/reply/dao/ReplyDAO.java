package com.tap.reply.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.reply.dto.ReplyDTO;

@Repository
public class ReplyDAO {
	@Autowired
	private SqlSession mybatis;

	public ReplyDTO selectByParentSeq(int parentSeq) {
		return mybatis.selectOne("Reply.selectByParentSeq",parentSeq);
	}

	public int insert(ReplyDTO dto) {
		return mybatis.insert("Reply.insert",dto);
	}
	
	
}
