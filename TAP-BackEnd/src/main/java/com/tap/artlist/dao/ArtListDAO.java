package com.tap.artlist.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.artlist.dto.ArtListDTO;

@Repository
public class ArtListDAO {
	
	@Autowired
	private SqlSession mybatis;
	
	public List<ArtListDTO> getList(int category){
		return mybatis.selectList("ArtList.getListByCategory",category);
	}
	
	public List<ArtListDTO> getOpenList(int category){
		return mybatis.selectList("ArtList.getOpenListByCategory",category);
	}
	
	public List<ArtListDTO> getTapList(String genre, String category){
		
		Map<String, String> map = new HashMap<>();
		map.put("genre", genre);
		map.put("category", category);
		return mybatis.selectList("ArtList.getTapListByGenre", map);
	}
	
}
