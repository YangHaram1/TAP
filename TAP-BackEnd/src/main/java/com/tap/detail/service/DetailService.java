package com.tap.detail.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.tap.detail.dao.DetailDAO;
import com.tap.detail.dto.CastingDTO;
import com.tap.detail.dto.DetailDTO;
import com.tap.detail.dto.ExciteDTO;
import com.tap.detail.dto.ReviewStarDTO;
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
	
	public List<ScheduleAndCastingDTO> getCastingAndDateNotArt(int seq) {
		return dDao.getCastingAndDateNotArt(seq);
	}
	
	public List<ReviewStarDTO> getReview(int seq) {
		return dDao.getReview(seq);
	}
	
	public List<ExciteDTO> getExcite(int seq) {
		return dDao.getExcite(seq);
	}
	
	// 키워드에 대한 리뷰 목록 출력
	public List<ReviewStarDTO> getReviewByKeyword(Map<String, Object> search) {
		return dDao.getReviewByKeyword(search);
	}
	
	// 키워드에 대한 목록 출력
	public List<ExciteDTO> getExciteByKeyword(Map<String, Object> search) {
		return dDao.getExciteByKeyword(search);
	}
	
	// 테이블 데이터 수 (테이블명, 상품명)
	public int getCount(Map<String, Object> data) {
		return dDao.getCount(data);
	}


}
