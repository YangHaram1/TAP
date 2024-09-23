package com.tap.board.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.board.dao.BoardDAO;
import com.tap.board.dto.BoardDTO;

import jakarta.transaction.Transactional;

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
	
	@Transactional
	public int insert(BoardDTO dto) {
		return bdao.insert(dto);
	}
	
	public BoardDTO detail(int seq){
		return bdao.detail(seq);
	}
	
	public int delete(int seq) {
		return bdao.delete(seq);
	}
	
	public int update(BoardDTO dto) throws Exception{
		return bdao.update(dto);
	}
}
