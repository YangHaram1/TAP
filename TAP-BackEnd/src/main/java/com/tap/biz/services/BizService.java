package com.tap.biz.services;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.biz.dao.BizDAO;


@Service
public class BizService {
	@Autowired
	private BizDAO bizdao;
	public List<HashMap<String, Object>> getAllCategory(){
		return bizdao.getAllCategory();
	}
	public List<HashMap<String, Object>> getAllSubCategory(){
		return bizdao.getAllSubCategory();
	}
	public List<HashMap<String, Object>> getAllLocation(){
		return bizdao.getAllLocation();
	}
	public List<HashMap<String, Object>> getAllGenre(){
		return bizdao.getAllGenre();
	}
	public List<HashMap<String, Object>> getAllTeam(){
		return bizdao.getAllTeam();
	}
}
