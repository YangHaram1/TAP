package com.tap.detail.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.detail.dao.DescriptionDAO;
import com.tap.detail.dto.DescriptionDTO;

@Service
public class DescriptionService {
	
	@Autowired
	private DescriptionDAO dDao;
	
	public DescriptionDTO getContent(int seq) {
		return dDao.getContent(seq);
	}

}
