package com.tap.board.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.board.dao.BoardDAO;
import com.tap.board.dto.BoardDTO;

@Service
public class BoardService {
	
	@Autowired
	private BoardDAO bdao;
	
	public List<BoardDTO> getAllBoard(){
		return bdao.getAllBoard();
	}
	
	public Map<String, Object> selectAll(Map<String, Object> map) {
		Map<String, Object> result =new HashMap<>();
		result.put("list", bdao.selectAll(map));
//		result.put("count", bdao.getInquiryCount(map));
		
		return result;
	}
	
}
