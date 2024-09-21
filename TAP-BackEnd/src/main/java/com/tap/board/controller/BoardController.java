package com.tap.board.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	@GetMapping("/admin")
	ResponseEntity<Map<String,Object>> getAll(
			@RequestParam(name = "start", required = true, defaultValue = "1") int start,
			@RequestParam(name = "end", required = true, defaultValue = "5") int end,
			@RequestParam(name = "status", required = false, defaultValue = "") String status,
			@RequestParam(name = "category", required = false, defaultValue = "") String category) throws Exception {
		Map<String, Object> map= new HashMap<>();
		System.out.println(status);
		System.out.println(category);
		map.put("start", start);
		map.put("end", end);
		map.put("status", status);
		map.put("category", category);
		Map<String, Object> result=bserv.selectAll(map);
		return ResponseEntity.ok(result);
		
		
	
	}
}
