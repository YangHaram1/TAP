package com.tap.detail.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.detail.dto.DescriptionDTO;
import com.tap.detail.service.DescriptionService;

@RestController
@RequestMapping("/description")
public class DescriptionController {
	
	@Autowired
	private DescriptionService dServ;
	
	@GetMapping("{seq}")
	public DescriptionDTO getContent(@PathVariable int seq) {
		System.out.println(seq + "번 상품 정보 요청");
		
		return dServ.getContent(seq); 
	}
	
	

}
