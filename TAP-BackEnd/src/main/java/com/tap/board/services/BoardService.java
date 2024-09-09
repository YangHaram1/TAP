package com.tap.board.services;

import java.util.List;

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
	
}
