package com.tap.admin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<MembersDTO> searchUserMem(String keyword) {
        MembersDTO dto = new MembersDTO();
        dto.setName(keyword);
        return aumDao.searchUserMem(keyword);
    }
    public List<MembersGradeDTO> getGrade(){
    	return aumDao.getGrade();
    }
}
