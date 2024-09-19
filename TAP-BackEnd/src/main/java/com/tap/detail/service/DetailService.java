package com.tap.detail.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.tap.detail.dao.DetailDAO;
import com.tap.detail.dto.CastingDTO;
import com.tap.detail.dto.DetailDTO;
import com.tap.detail.dto.ScheduleAndCastingDTO;
import com.tap.detail.dto.SeatsDTO;

@Service
public class DetailService {
	
	@Autowired
	private DetailDAO dDao;
	
	public DetailDTO getDetailData(int seq) {
		return dDao.getDetailData(seq);
	}
	
	public List<CastingDTO> getCasting(int seq){
		return dDao.getCasting(seq);
	}
	
	public List<String> getDays(int seq) {
		return dDao.getDays(seq);
	}
	
	public List<String> getTimes(int seq) {
		return dDao.getTimes(seq);
	}
	
	public List<ScheduleAndCastingDTO> getCastingAndDate(int seq) {
		return dDao.getCastingAndDate(seq);
	}

}
