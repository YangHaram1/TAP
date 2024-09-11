package com.tap.admin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.admin.dao.AdminUserMemberDAO;
import com.tap.members.dto.MembersDTO;

@Service
public class AdminUserMemberService {
	@Autowired
	private AdminUserMemberDAO aumDao;
	
	public List<MembersDTO> selectMEmbers(MembersDTO dto){
		return aumDao.selectMember(dto);
	}
}
