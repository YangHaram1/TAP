package com.tap.chat.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

	public ChatDTO getLastDTO(int groupSeq) {
		return mybatis.selectOne("Chat.getLastDto",groupSeq);
	}

	public int unread(int groupSeq, int lastChatSeq, int seq) {
		Map<String, Integer> map=new HashMap<>();
		map.put("group_seq", groupSeq);
		map.put("last_chat_seq", lastChatSeq);
		map.put("seq", seq);
		return mybatis.selectOne("Chat.unread",map);
	}
	
}
