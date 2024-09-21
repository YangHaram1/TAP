package com.tap.detail.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import com.tap.detail.dto.ScheduleAndCastingDTO;
import com.tap.detail.dto.CastingDTO;
import com.tap.detail.dto.DetailDTO;

@Repository
public class DetailDAO {
	
	@Autowired
	private SqlSession mybatis;

	public DetailDTO getDetailData(@PathVariable int seq) {
		return mybatis.selectOne("Detail.getDetailData",seq);
	}
	
	public List<CastingDTO> getCasting(int seq){
		return mybatis.selectList("Detail.getCasting",seq);
	}
	
	public List<String> getDays(int seq) {
		return mybatis.selectList("Detail.getDays",seq);
	}
	
	public List<String> getTimes(int seq) {
		return mybatis.selectList("Detail.getTimes",seq);
	}
	
	public List<ScheduleAndCastingDTO> getCastingAndDate(int seq) {
		return mybatis.selectList("Detail.getCastingAndDate",seq);
	}
	
	public List<ScheduleAndCastingDTO> getCastingAndDateNotArt(int seq) {
		return mybatis.selectList("Detail.getCastingAndDateNotArt",seq);
	}

}
