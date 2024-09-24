package com.tap.search.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tap.artlist.service.ArtListService;
import com.tap.search.dto.SearchResultDTO;
import com.tap.search.service.SearchService;

@RestController
@RequestMapping("/search")
public class SearchController {
	@Autowired
	private SearchService serv;
	
	
	@GetMapping
	public ResponseEntity<List<SearchResultDTO>> search(@RequestParam("query") String query) {

		List<SearchResultDTO> list =serv.searchApply(query);
		return ResponseEntity.ok(list);
	}
}
