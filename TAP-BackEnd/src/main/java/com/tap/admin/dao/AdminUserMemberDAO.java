package com.tap.admin.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.members.dto.MembersDTO;

@Repository
public class AdminUserMemberDAO {
	@Autowired
	private SqlSession mybatis;

	public List<MembersDTO> selectMember() {
		return	mybatis.selectList("AdminUserMem.getAllUserMem");
		
	}
	public List<MembersDTO> searchUserMems(String keyword, Integer gradeSeq) {
	    Map<String, Object> params = new HashMap<>();
	    params.put("keyword", keyword);
	    params.put("gradeSeq", gradeSeq);

	    return mybatis.selectList("searchUserMem", params);
	}
	
	public void updateMemberStatus(List<String> orderSeqs, int enabled, int gradeSeq) {
		System.out.println("dao 번호" +orderSeqs);
		 System.out.println("dao 상태 enabled: " + enabled + ", gradeSeq: " + gradeSeq);
		
		 for (String orderSeq : orderSeqs) {
	            HashMap<String, Object> params = new HashMap<>();
	            params.put("orderSeq", orderSeq);
	            params.put("enabled", enabled);
	            params.put("gradeSeq", gradeSeq);

	            System.out.println("orderSeq " + orderSeq);
	            
	            // MyBatis 매퍼에서 enabled와 grade_seq를 업데이트하도록 변경
	            mybatis.update("AdminUserMem.updateMemberStatus", params);
	        }
	    }

}
