package com.tap.admin.services;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.admin.dao.BizMemDAO;

@Service
public class BizMemService {
	@Autowired
	private BizMemDAO bizMemdao;
	public List<HashMap<String, Object>> getAllBizMem(){
		return bizMemdao.getAllBizMem();
	}
}
