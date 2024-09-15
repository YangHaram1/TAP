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
	
	public List<HashMap<String, Object>> getCurrentProductsByCategory(String category){
		return adProdao.getCurrentProductsByCategory(category);
	}
	public List<HashMap<String, Object>> getFutureProductsByCategory(String category){
		return adProdao.getFutureProductsByCategory(category);
	}
	public List<HashMap<String, Object>> getPastProductsByCategory(String category){
		return adProdao.getPastProductsByCategory(category);
	}
}