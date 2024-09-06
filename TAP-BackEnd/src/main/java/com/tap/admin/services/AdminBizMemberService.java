package com.tap.admin.services;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.admin.dao.AdminBizMemberDAO;

@Service
public class AdminBizMemberService {
	@Autowired
	private AdminBizMemberDAO adminbizMemdao;
	
	public List<HashMap<String, Object>> getAllBizMem(){
		return adminbizMemdao.getAllBizMem();
	}
}
