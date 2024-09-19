package com.tap.artlist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.artlist.dto.GenreDTO;
import com.tap.artlist.service.GenreService;

@RestController
@RequestMapping("/genre")
public class GenreController {

	@Autowired
	private GenreService gServ;
	
	@GetMapping("/{category}")
	public List<GenreDTO> getGenre(@PathVariable int category){
		return gServ.getGenre(category);
	}
	
}
