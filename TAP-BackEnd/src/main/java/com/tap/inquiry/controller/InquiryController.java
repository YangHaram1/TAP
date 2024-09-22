package com.tap.inquiry.controller;

import java.lang.reflect.Type;
import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
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
	ResponseEntity<Map<String, Object>> getAll(
			@RequestParam(name = "start", required = true, defaultValue = "1") int start,
			@RequestParam(name = "end", required = true, defaultValue = "5") int end,
			@RequestParam(name = "status", required = false, defaultValue = "") String status,
			@RequestParam(name = "category", required = false, defaultValue = "") String category) throws Exception {
	
		Map<String, Object> map= new HashMap<>();
		map.put("start", start);
		map.put("end", end);
		map.put("status", status);
		map.put("category", category);
		Map<String, Object> result=serv.selectAll(map);
		return ResponseEntity.ok(result);
	}
	
	@GetMapping("/{seq}")
	ResponseEntity<InquiryDTO> get(@PathVariable int seq) throws Exception {
	
		InquiryDTO dto =serv.selectBySeq(seq);
		return ResponseEntity.ok(dto);
	}
	
}
