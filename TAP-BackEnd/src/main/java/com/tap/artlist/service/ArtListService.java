package com.tap.artlist.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.artlist.dao.ArtListDAO;
import com.tap.artlist.dto.ArtListDTO;

@Service
public class ArtListService {
	
	@Autowired
	private ArtListDAO alDao;
	
	public List<ArtListDTO> getList(int category){
		return alDao.getList(category);
	}
	
	public List<ArtListDTO> getOpenList(int category){
		return alDao.getOpenList(category);
	}
	
	public List<ArtListDTO> getTapList(String genre, String category){
		return alDao.getTapList(genre, category);
	}
}
