package com.tap.board.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.board.dto.BoardDTO;
import com.tap.board.services.BoardService;

@RestController
@RequestMapping("/board")
public class BoardController {
	@Autowired
	private BoardService bserv;
	
	@GetMapping
	public ResponseEntity<List<BoardDTO>> getAllBoard() {
		List<BoardDTO> list = bserv.getAllBoard();
		
		return ResponseEntity.ok(list);
		}
}
