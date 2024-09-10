package com.tap.members.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.tap.members.dao.MembersDAO;
import com.tap.members.dto.MembersDTO;
import com.tap.members.dto.MembersGradeDTO;

@Service
public class MembersService implements UserDetailsService{

	@Autowired
	private MembersDAO dao;
	
	public int signUp(MembersDTO dto) throws Exception{
		System.out.println(dto.getPw());
		return dao.signUp(dto);
		
	}
	@Override
	public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
		User user=null;
		try {
			MembersDTO dto =dao.selectById(id);
			if(dto.getEnabled()==1)
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
	
	public int updateMember(MembersDTO dto) throws Exception{
		return dao.updateMember(dto);
	}
	
	public int updatePwById(String id,String pw) throws Exception{
		Map<String , String> map=new HashMap<>();
		map.put("id", id);
		map.put("pw", pw);
		return dao.updatePwById(map);
	}
	
	public List<String> selectByAdmin() throws Exception{
		return dao.selectByAdmin();
	}

}
