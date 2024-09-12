package com.tap.team.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.team.dto.TeamDTO;
import com.tap.team.service.TeamService;

@RestController
@RequestMapping("/team")
public class TeamController {

	@Autowired
	private TeamService tServ;
	
	@GetMapping
	public ResponseEntity<List<TeamDTO>> selectTeam(){
	    List<TeamDTO> teams = tServ.selectTeam();
	    return ResponseEntity.ok(teams);
	}
	
	
	
	}
