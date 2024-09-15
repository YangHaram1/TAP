package com.tap.team.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.team.dao.TeamDAO;
import com.tap.team.dto.TeamDTO;

@Service
public class TeamService {

	@Autowired
	private TeamDAO tDao;
	
	public List<TeamDTO> selectTeam(){
		return tDao.selectTeam();
	}
}
