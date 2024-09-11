package com.tap.biz.services;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.biz.dao.BizManageDAO;

@Service
public class BizManageService {
 
	@Autowired
	private BizManageDAO bizMandao;
	
	public List<HashMap<String, Object>> getAllProduct(){
		return bizMandao.getAllProduct();
	}
	public List<HashMap<String,Object>> getAllPoster(){
		return bizMandao.getAllPoster();
	}
}
