package com.tap.chat.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.chat.dto.ChatDTO;

@Repository
public class ChatDAO {

	@Autowired
	private SqlSession mybatis;
	
	public ChatDTO insert(ChatDTO dto) throws Exception{
		 mybatis.insert("Chat.insert",dto);
		 dto.setWrite_date(mybatis.selectOne("Chat.writeDateBySeq",dto.getSeq()));
		 return dto;
	}
	
	public List<ChatDTO> selectByGroupSeq(int GroupSeq) throws Exception{
		return mybatis.selectList("Chat.selectByGroupSeq",GroupSeq);
	}
	
}
