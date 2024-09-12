package com.tap.admin.services;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.admin.dao.AdminProductDAO;

@Service
public class AdminProductService {
	@Autowired 
	private AdminProductDAO adProdao;
	
	public List<HashMap<String, Object>> getAllCurrentProducts(){
		return adProdao.getAllCurrentProducts();
	}
	public List<HashMap<String, Object>> getAllPastProducts(){
		return adProdao.getAllPastProducts();
	}
	public List<HashMap<String, Object>> getAllFutureProducts(){
		return adProdao.getAllFutureProducts();
	}
}