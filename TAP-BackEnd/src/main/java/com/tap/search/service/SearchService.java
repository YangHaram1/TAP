package com.tap.search.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.search.dao.SearchDAO;
import com.tap.search.dto.SearchResultDTO;

@Service
public class SearchService {
	
	@Autowired
	private SearchDAO sdao;

	public List<SearchResultDTO> searchApply(String query) {
		return sdao.searchApply(query);
		}	
	
//	public List<SearchResultDTO> searchByQuery(String keyword) {
//		return sdao.searchByKeyword(keyword);
//	}
}
