package com.tap.chatupload.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.chatupload.dto.ChatUploadDTO;

@Repository
public class ChatUploadDAO {
	@Autowired
	private SqlSession mybatis;
	
	public int insert(ChatUploadDTO dto) throws Exception{
		mybatis.insert("ChatUpload.insert",dto);
		return dto.getSeq();
	}
}
