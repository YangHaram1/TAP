package com.tap.search.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.search.dto.SearchResultDTO;

@Repository
public class SearchDAO {
	@Autowired
	private SqlSession mybatis;
	
	public List<SearchResultDTO> searchApply(String query) {
		// TODO Auto-generated method stub
		return mybatis.selectList("Search.apply",query);
	}

}
