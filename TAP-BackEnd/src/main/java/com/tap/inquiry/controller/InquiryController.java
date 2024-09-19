package com.tap.inquiry.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.tap.delivery.dto.DeliveryDTO;
import com.tap.inquiry.dto.InquiryDTO;
import com.tap.inquiry.service.InquiryService;

@RestController
@RequestMapping("inquiry")
public class InquiryController {
	@Autowired
	private InquiryService serv;
	
	@PostMapping
	public ResponseEntity<String> insert(@RequestPart String inquiry,@RequestPart(value = "files",required = false) MultipartFile[] files,Principal principal) throws Exception {
		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		Gson gson= new Gson();
		InquiryDTO dto= gson.fromJson(inquiry, InquiryDTO.class);
		dto.setMember_id(username);
		serv.insert(dto,files);
		return ResponseEntity.ok(String.valueOf(dto.getSeq()));
	}
	
	@GetMapping 
	ResponseEntity<List<InquiryDTO>> get(Principal principal) throws Exception {
		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		List<InquiryDTO> list =serv.selectById(username);
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/admin")
	ResponseEntity<List<InquiryDTO>> getAll() throws Exception {
	
		List<InquiryDTO> list =serv.selectAll();
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/{seq}")
	ResponseEntity<InquiryDTO> get(@PathVariable int seq) throws Exception {
	
		InquiryDTO dto =serv.selectBySeq(seq);
		return ResponseEntity.ok(dto);
	}
	
}
