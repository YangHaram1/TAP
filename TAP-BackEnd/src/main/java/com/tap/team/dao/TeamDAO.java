package com.tap.team.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.team.dto.TeamDTO;

@Repository
public class TeamDAO {
	
	
	@Autowired
	private SqlSession mybatis;
	
	public List<TeamDTO> selectTeam(){
		return mybatis.selectList("Team.selectTeam");
	}

}
