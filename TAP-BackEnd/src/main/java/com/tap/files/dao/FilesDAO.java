package com.tap.files.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.files.dto.FilesDTO;

@Repository
public class FilesDAO {

	@Autowired
	private SqlSession mybatis;
	
	public int insertBizz(FilesDTO fdto) {
		return mybatis.insert("Files.insert",fdto);
		
	}

}
