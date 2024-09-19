package com.tap.detail.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.detail.dao.SeatsDAO;
import com.tap.detail.dto.SeatsDTO;

@Service
public class SeatsService {
	
	@Autowired
	private SeatsDAO sDao;
	
	public List<SeatsDTO> getPrice(int place_seq){
		return sDao.getPrice(place_seq);
	}

}
