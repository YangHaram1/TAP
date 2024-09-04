package com.tap.members.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tap.members.dao.MembersDAO;
import com.tap.members.dto.MembersDTO;
import com.tap.members.dto.MembersGradeDTO;

@Service
public class MembersService implements UserDetailsService{

	@Autowired
	private MembersDAO dao;
	

	@Override
	public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
		User user=null;
		try {
			MembersDTO dto =dao.selectById(id);
			user =new User(dto.getId(),dto.getPw(), AuthorityUtils.createAuthorityList(dto.getRole()));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return user;
	}
	
	public MembersGradeDTO getMemberInfo(String id) throws Exception{
		return dao.getMemberInfo(id);
	}
	
	public MembersDTO selectById(String id) throws Exception{
		return dao.selectById(id);
	}
	

}
