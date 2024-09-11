package com.tap.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tap.admin.services.AdminUserMemberService;
import com.tap.members.dto.MembersDTO;

@RestController
@RequestMapping("/admin/usermem")
public class AdminUserMemberController {
	@Autowired
	private AdminUserMemberService aumServ;
	@GetMapping("/selectAll")
	public List<MembersDTO> getAllUserMem() {
	    return aumServ.selectMEmbers();
	}

    @GetMapping("/search")
    public List<MembersDTO> searchUserMem(@RequestParam String keyword) {
        return aumServ.searchUserMem(keyword);
    }
}
