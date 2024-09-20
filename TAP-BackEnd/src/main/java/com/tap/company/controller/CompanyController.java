package com.tap.company.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.tap.company.dto.CompanyDTO;
import com.tap.company.service.CompanyService;
import com.tap.members.dto.MembersDTO;

@RestController
@RequestMapping("/company")
public class CompanyController {
	
	@Autowired
	private CompanyService cserv;
	
	@Autowired
	private PasswordEncoder pe;
	

	// 회원가입 등록
	@PostMapping
	public ResponseEntity<String> signUp(@RequestPart String member , @RequestPart String company,@RequestPart MultipartFile file) throws Exception{
		System.out.println(member);
		System.out.println(company);
		Gson gson= new Gson();
		MembersDTO mdto= gson.fromJson(member, MembersDTO.class);  //json 문자열을 객체로 역직렬화
		CompanyDTO cdto =gson.fromJson(company, CompanyDTO.class); //json 문자열을 객체로 역직렬화
		
		String encodePassword = pe.encode(mdto.getPw());
		mdto.setPw(encodePassword);
		
		System.out.println(mdto.getId());
		System.out.println(cdto.getName());
		
		cserv.signUp(cdto,mdto,file);
		
		return ResponseEntity.ok().build();
	}
	
	// 회원가입 사업체 이름 중복 검사
	@GetMapping("/name/{name}")
	public ResponseEntity<Integer> selectByName(@PathVariable String name) throws Exception {
		int checkName = cserv.checkName(name); // 1 or 0
		return ResponseEntity.ok(checkName);
	}
}
