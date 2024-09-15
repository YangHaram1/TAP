package com.tap.members.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.members.dto.MembersDTO;
import com.tap.members.dto.MembersDeliveryDTO;
import com.tap.members.dto.MembersGradeDTO;

@Repository
public class MembersDAO {
	@Autowired
	private SqlSession mybatis;
	
	public MembersDTO selectById(String id) throws Exception{
		
		return mybatis.selectOne("Members.selectById",id);
	}
	
	public MembersGradeDTO getMemberInfo(String id) throws Exception{
		return mybatis.selectOne("Members.getMemberInfo",id);
	}
	
	public int updateMember(MembersDTO dto) throws Exception{
		return mybatis.update("Members.updateMember",dto);
	}
	
	public int updatePwById(Map<String , String> map) throws Exception{
		return mybatis.update("Members.updatePwById",map);
	}
	
	
	//	회원가입 등록
	public int signUp(MembersDeliveryDTO dto) throws Exception{
		return mybatis.insert("Members.signUp",dto);
	}
	
	//	회원가입 사업자 등록
	public int signUpBiz(MembersDTO dto) throws Exception{
		return mybatis.insert("Members.signUpBiz",dto);
	}
	
	
	// 회원가입 아이디 중복 검사
	public int checkId(String id) throws Exception{
		return mybatis.selectOne("Members.checkId",id);
	}
	
	// 회원가입 이메일 중복 검사
	public int checkEmail(String email) throws Exception{
		return mybatis.selectOne("Members.checkEmail",email);
	}
	
	// 아이디 찾기
	public String findId(String name, String email) throws Exception{
		MembersDTO dto =new MembersDTO();
		dto.setEmail(email);
		dto.setName(name);
		return mybatis.selectOne("Members.findId", dto);
	}
	public List<String> selectByAdmin() throws Exception{
		return mybatis.selectList("Members.selectByAdmin");
	}
	
}
