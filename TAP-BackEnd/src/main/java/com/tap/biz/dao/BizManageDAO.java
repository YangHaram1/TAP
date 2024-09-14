package com.tap.biz.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BizManageDAO {
	@Autowired
	private SqlSession mybatis;
	
	public List<HashMap<String, Object>> getAllCurrentApproved(String id){
		return mybatis.selectList("BizManage.getAllCurrentApproved", id);
	}
	public List<HashMap<String, Object>> getAllFutureApproved(String id){
		return mybatis.selectList("BizManage.getAllFutureApproved", id);
	}
	public List<HashMap<String, Object>> getAllPastApproved(String id){
		return mybatis.selectList("BizManage.getAllPastApproved", id);
	}
	public List<HashMap<String, Object>> getAllWaiting(String id){
		return mybatis.selectList("BizManage.getAllWaiting", id);
	}
	public List<HashMap<String, Object>> getAllRecentApproved(String id){
		return mybatis.selectList("BizManage.getAllRecentApproved", id);
	}
	public void cancelRegistration(Long applicationSeq) {
		mybatis.update("BizManage.cancelRegistration", applicationSeq);
	}
	
	
	public List<HashMap<String, Object>> getAllPoster(){
		return mybatis.selectList("BizManage.getAllPoster");
	}
}
