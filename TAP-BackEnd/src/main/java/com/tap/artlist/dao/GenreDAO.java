package com.tap.artlist.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import com.tap.artlist.dto.GenreDTO;

@Repository
public class GenreDAO {

	@Autowired
	private SqlSession mybatis;
	
	public List<GenreDTO> getGenre(@PathVariable int category){
		return mybatis.selectList("Genre.selectByCategory",category);
	}
	
}
