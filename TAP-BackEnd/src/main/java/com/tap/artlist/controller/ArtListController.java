package com.tap.artlist.controller;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tap.artlist.dto.ArtListDTO;
import com.tap.artlist.service.ArtListService;

@RestController
@RequestMapping("/artlist")
public class ArtListController {
	
	@Autowired
	private ArtListService alServ;
	
	// 메인 카러셀 데이터 추출
	// 현재 카테고리(뮤지컬, 콘서트)별 승인된 공연 추출 (콘텐츠가 많아질 경우 예약대기는 제외 예정) 
	@GetMapping("/{category}")
	public List<ArtListDTO> getList(@PathVariable int category) {
		System.out.println("카테고리 테스트: "+ category);
		return alServ.getList(category);
		
	}
	
	// 서브3카러셀 데이터 추출
	// 승인된 공연 중 오픈 예정인 공연만 추출
	@GetMapping("/openContents/{category}")
	public List<ArtListDTO> getOpenList(@PathVariable int category) {
		System.out.println("카테고리 테스트: "+ category);
		return alServ.getOpenList(category);
		
	}
	
	//art 장르별 목록 출력
	@GetMapping("/getTap")
	public List<ArtListDTO> getTapList(@RequestParam String genre, @RequestParam String category) {
		System.out.println("장르 테스트: "+ genre + category);
		// map 이용해서 두개 담아야할듯
		return alServ.getTapList(genre, category);
		
	}
	
}
