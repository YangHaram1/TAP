package com.tap.company.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.company.dto.CompanyDTO;

@Repository
public class CompanyDAO {
	
	@Autowired
	private SqlSession mybatis;
	
	// 회원가입 등록
	public void signUp(CompanyDTO dto) throws Exception{

		mybatis.insert("Company.signUp",dto);

	}
	
	public CompanyDTO getCompanyData(String id) {
		return mybatis.selectOne("Company.selectById",id);
	}
	
	// 회원가입 사업체 이름 중복 검사
	public int checkName(String name) throws Exception{
		return mybatis.selectOne("Company.checkName",name);
	}
}
