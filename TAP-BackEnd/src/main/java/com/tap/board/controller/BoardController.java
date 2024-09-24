package com.tap.board.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@PostMapping
	public ResponseEntity<String> insert(Principal principal, @RequestBody BoardDTO dto) throws Exception{
		if(principal == null) {
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		dto.setMember_id(username);
		int result = bserv.insert(dto);
		if(result > 0) {
			return ResponseEntity.ok("success");
		}
		return ResponseEntity.ok("fail");
		
	}
	
	@DeleteMapping("/delete/{seq}")
	public ResponseEntity<String> delete(@PathVariable int seq) throws Exception{
		int result = bserv.delete(seq);
		if(result>0) {
			return ResponseEntity.ok().build();
		}
		else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
	
	@GetMapping("/detail/{seq}")
	public ResponseEntity<BoardDTO> detail(@PathVariable int seq) throws Exception{
		BoardDTO list = bserv.detail(seq);
		return ResponseEntity.ok(list);
		
	}
	
	@PutMapping
	public ResponseEntity<String> update(@RequestBody BoardDTO dto) throws Exception{
		int result = bserv.update(dto);
		if(result>0) {
			return ResponseEntity.ok("success");
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("fail");
	}
	@GetMapping("/admin")
	ResponseEntity<Map<String,Object>> getAll(
			@RequestParam(name = "start", required = true, defaultValue = "1") int start,
			@RequestParam(name = "end", required = true, defaultValue = "5") int end,
			@RequestParam(name = "keyword", required = false, defaultValue = "") String keyword,
			@RequestParam(name = "target", required = false, defaultValue = "") String target) throws Exception {
		Map<String, Object> map= new HashMap<>();
		
		map.put("start", start);
		map.put("end", end);
		map.put("keyword", keyword);
		map.put("target", target);
		Map<String, Object> result=bserv.selectAll(map);
		return ResponseEntity.ok(result);
		
		
	
	}
}
