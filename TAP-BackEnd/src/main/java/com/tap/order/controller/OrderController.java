package com.tap.order.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tap.detail.dto.SeatsDTO;
import com.tap.detail.service.SeatsService;
import com.tap.order.dto.PlaceAndSectionDTO;
import com.tap.order.dto.SectionInnerDataDTO;
import com.tap.order.service.OrderService;

@RestController
@RequestMapping("/order")
public class OrderController {
	
	@Autowired
	private OrderService oServ;
	@Autowired
	private SeatsService sServ;
	
	@GetMapping("/{placeSeq}")
	public Map<String,?> getSeatData(@PathVariable int placeSeq){
		
		Map map = new HashMap<>();
		
		// 섹션 정보 (총 좌석수, 섹션이름, 공연장 모양, 섹션별 행, 열)
		List<PlaceAndSectionDTO> section = oServ.getSection(placeSeq);
		// 섹션 내부 정보 (좌석)
		List<SectionInnerDataDTO> sectionInnerData = oServ.getInnerData(placeSeq);
		// 좌석 가격
		List<SeatsDTO> seats = sServ.getPrice(placeSeq);
		
		map.put("section", section);
		map.put("sectionInnerData", sectionInnerData);
		map.put("seats", seats);
		
		return map;	
	}
	
	@GetMapping("/getDate")
	public ResponseEntity<Map<String, ?>> getDate(@RequestParam int seq){
		Map map = new HashMap<>();		
		List<Map<String,Object>> dateList = oServ.getDate(seq); 		
		map.put("dateList", dateList);	
		return ResponseEntity.ok(map);
	}
	

}
