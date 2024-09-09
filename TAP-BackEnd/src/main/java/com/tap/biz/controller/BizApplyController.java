package com.tap.biz.controller;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.biz.dto.BizApplyDTO;
import com.tap.biz.dto.ScheduleDateDTO;
import com.tap.biz.dto.TestClobDTO;
import com.tap.biz.services.BizService;

@RestController
@RequestMapping("/biz/application")
public class BizApplyController {
	@Autowired
	private BizService bizServ;
	
	@GetMapping("/category")
	public ResponseEntity<List<HashMap<String, Object>>> getAllCategory(){
		return ResponseEntity.ok(bizServ.getAllCategory());
	}
	@GetMapping("/subcategory")
	public ResponseEntity<List<HashMap<String, Object>>> getAllSubCategory(){
		return ResponseEntity.ok(bizServ.getAllSubCategory());
	}
	@GetMapping("/location")
	public ResponseEntity<List<HashMap<String, Object>>> getAllLocation(){
		return ResponseEntity.ok(bizServ.getAllLocation());
	}
	@GetMapping("/genre")
	public ResponseEntity<List<HashMap<String, Object>>> getAllGenre(){
		return ResponseEntity.ok(bizServ.getAllGenre());
	}
	@GetMapping("/team")
	public ResponseEntity<List<HashMap<String, Object>>> getAllTeam(){
		return ResponseEntity.ok(bizServ.getAllTeam());
	}
	@GetMapping("/teamlocation")
	public ResponseEntity<List<HashMap<String, Object>>> getAllTeamLocation(){
		return ResponseEntity.ok(bizServ.getAllTeamLocation());
	}
	@GetMapping("/description")
	public ResponseEntity<List<TestClobDTO>> getContent(){
		return ResponseEntity.ok(bizServ.getContent());
	}

	// 상품 테이블에 insert POST
	@PostMapping
	public ResponseEntity<Void> insertEvent(@RequestBody BizApplyDTO formData
			){
		String id = formData.getId();
		Timestamp start_date = formData.getStart_date();
		int running_time = formData.getRunning_time();
		Timestamp open_date = formData.getOpen_date();
//		System.out.println(formData.getScheduleDate().get(0).getSchedule_date());
//		System.out.println(id);
//		System.out.println(start_date);
//		System.out.println(open_date);
		int away_team_seq = formData.getAway_team_seq();
		System.out.println("원정팀:" + away_team_seq);

		List<ScheduleDateDTO> list = formData.getScheduleDate();
		System.out.println(list.get(0).getSchedule_date());
		
		
//		bizServ.insertEvent(dto);
		return ResponseEntity.ok().build();
	}
}
