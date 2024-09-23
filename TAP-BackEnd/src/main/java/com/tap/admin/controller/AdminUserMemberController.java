package com.tap.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    
 // 기업 가입 승인 처리
    // 기업 가입 승인 처리
    @PutMapping("/update_status")
    public ResponseEntity<String> updateMembersStatus(@RequestBody Map<String, Object> request) {
        try {
            List<String> orderSeqs = (List<String>) request.get("orderSeqs"); // 주문 번호 목록
            String newStatus = (String) request.get("newStatus"); // 새로운 상태 (1: 일반회원, -1: 블랙리스트)
            
            System.out.println(orderSeqs + newStatus);
            aumServ.updateMembersStatus(orderSeqs, newStatus); // enabled = 1, grade_seq = 1
           

            return ResponseEntity.ok("회원 상태가 성공적으로 업데이트되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("회원 상태 업데이트 중 오류가 발생했습니다.");
        }
    }
}
