package com.tap.groupchat.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.groupchat.dto.GroupChatDTO;

@Repository
public class GroupChatDAO {
	@Autowired
	private SqlSession mybatis;
	
	public int insert() throws Exception{
		GroupChatDTO dto=new GroupChatDTO();
		mybatis.insert("GroupChat.insert",dto);
		return dto.getSeq();
	}

}
