package com.tap.grade.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
}
