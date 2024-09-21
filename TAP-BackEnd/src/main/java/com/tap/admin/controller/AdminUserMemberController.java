package com.tap.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tap.admin.services.AdminUserMemberService;
import com.tap.grade.dto.GradeDTO;
import com.tap.grade.service.GradeService;
import com.tap.members.dto.MembersDTO;
import com.tap.members.dto.MembersGradeDTO;

@RestController
@RequestMapping("/admin/mem")
public class AdminUserMemberController {
	@Autowired
	private AdminUserMemberService aumServ;
	@Autowired
	private GradeService gServ;
	@GetMapping("/selectAll")
	public List<MembersDTO> getAllUserMem() {
	    return aumServ.selectMEmbers();
	}

    @GetMapping("/search")
    public List<MembersDTO> searchUserMem(
            @RequestParam String keyword,
            @RequestParam(required = false) Integer gradeSeq) {
    	
        return aumServ.searchUserMem(keyword, gradeSeq);
    }

    @GetMapping("/grades")
    public List<GradeDTO> getGrade() {
        return gServ.getGrade();
    }
}
