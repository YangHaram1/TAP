package com.tap.artlist.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.tap.artlist.dao.GenreDAO;
import com.tap.artlist.dto.GenreDTO;

@Service
public class GenreService {
	
	@Autowired
	private GenreDAO gDao;
	
	public List<GenreDTO> getGenre(@PathVariable int category){
		return gDao.getGenre(category);
	}
	

}
