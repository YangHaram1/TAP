package com.tap.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.admin.services.AdminUserMemberService;
import com.tap.members.dto.MembersDTO;

@RestController
@RequestMapping("/admin/usermem")
public class AdminUserMemberController {
	@Autowired
	private AdminUserMemberService aumServ;
	@GetMapping
	public List<MembersDTO> getAllBizMem(MembersDTO dto){
		return aumServ.selectMEmbers(dto);
	}
}
