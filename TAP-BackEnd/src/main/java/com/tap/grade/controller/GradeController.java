package com.tap.grade.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tap.grade.dto.GradeDTO;
import com.tap.grade.service.GradeService;

@RestController
@RequestMapping("/grade")
public class GradeController {
	
	@Autowired
	private GradeService serv;
	
	@GetMapping 
	ResponseEntity<List<GradeDTO>> get() throws Exception {
		
		List<GradeDTO> list =serv.selectAll();
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/list")
	ResponseEntity<Map<String, Object>> getList(
			@RequestParam(name = "start", required = true, defaultValue = "1") int start,
			@RequestParam(name = "end", required = true, defaultValue = "5") int end,
			@RequestParam(name = "target", required = false, defaultValue = "") String target,
			@RequestParam(name = "keyword", required = false, defaultValue = "") String keyword) throws Exception {
		
		Map<String, Object> map= new HashMap<>();
		map.put("start", start);
		map.put("end", end);
		map.put("target", target);
		map.put("keyword", keyword);
		Map<String, Object> list =serv.selectList(map);
		
		return ResponseEntity.ok(list);
	}
	
	@DeleteMapping("/{seq}")
	public ResponseEntity<String> deleteType(@PathVariable int seq) throws Exception {
		
		
		int result =serv.delete(seq);
		if(result>0) {
			return ResponseEntity.ok().build();
		}
		else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		
	}
}
