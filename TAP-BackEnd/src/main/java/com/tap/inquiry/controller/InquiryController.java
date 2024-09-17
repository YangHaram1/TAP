package com.tap.inquiry.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.inquiry.dao.InquiryDAO;
import com.tap.inquiry.dto.InquiryDTO;
import com.tap.inquiry.service.InquiryService;

@RestController
@RequestMapping("inquiry")
public class InquiryController {
	@Autowired
	private InquiryService serv;
	
	@PostMapping()
	public ResponseEntity<String> insert(@RequestBody InquiryDTO dto,Principal principal) throws Exception {
		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		dto.setMember_id(username);
		serv.insert(dto);
		return ResponseEntity.ok(String.valueOf(dto.getSeq()));
	}
}
