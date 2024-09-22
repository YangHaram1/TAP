package com.tap.admin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tap.admin.dao.AdminUserMemberDAO;
import com.tap.members.dto.MembersDTO;
import com.tap.members.dto.MembersGradeDTO;

@Service
public class AdminUserMemberService {
	@Autowired
	private AdminUserMemberDAO aumDao;
	
    public List<MembersDTO> selectMEmbers() {
        return aumDao.selectMember();
    }

    public List<MembersDTO> searchUserMem(String keyword, Integer gradeSeq) {
    	
        return aumDao.searchUserMems(keyword, gradeSeq);
    }
    
 // 기업 가입 승인 처리 
 	@Transactional
     public void updateMembersStatus(List<String> orderSeqs, String newStatus) {
 		  // newStatus 값에 따른 처리
        if ("-1".equals(newStatus)) {
            // 블랙리스트 처리 (enabled = 0, grade_seq = -1)
            aumDao.updateMemberStatus(orderSeqs, 0, -1);
        } else if ("1".equals(newStatus)) {
            // 일반 회원 처리 (enabled = 1, grade_seq = 1)
            aumDao.updateMemberStatus(orderSeqs, 1, 1);
        }
    }
}
