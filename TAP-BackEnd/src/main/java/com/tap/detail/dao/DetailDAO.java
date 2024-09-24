package com.tap.detail.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import com.tap.detail.dto.ScheduleAndCastingDTO;
import com.tap.detail.dto.CastingDTO;
import com.tap.detail.dto.DetailDTO;
import com.tap.detail.dto.ExciteDTO;
import com.tap.detail.dto.ReviewStarDTO;

@Repository
public class DetailDAO {
	
	@Autowired
	private SqlSession mybatis;

	public DetailDTO getDetailData(@PathVariable int seq) {
		return mybatis.selectOne("Detail.getDetailData",seq);
	}
	
	public List<CastingDTO> getCasting(int seq){
		return mybatis.selectList("Detail.getCasting",seq);
	}
	
	public List<String> getDays(int seq) {
		return mybatis.selectList("Detail.getDays",seq);
	}
	
	public List<String> getTimes(int seq) {
		return mybatis.selectList("Detail.getTimes",seq);
	}
	
	public List<ScheduleAndCastingDTO> getCastingAndDate(int seq) {
		return mybatis.selectList("Detail.getCastingAndDate",seq);
	}
	
	public List<ScheduleAndCastingDTO> getCastingAndDateNotArt(int seq) {
		return mybatis.selectList("Detail.getCastingAndDateNotArt",seq);
	}
	
	public List<ReviewStarDTO> getReview(int seq) {
		return mybatis.selectList("Detail.getReview",seq);
	}
	
	public List<ExciteDTO> getExcite(int seq) {
		return mybatis.selectList("Detail.getExcite",seq);
	}
	
	public List<ReviewStarDTO> getReviewByKeyword(Map<String, Object> search) {
		return mybatis.selectList("Detail.getReviewByKeyword",search);
	}
	
	public List<ExciteDTO> getExciteByKeyword(Map<String, Object> search) {
		return mybatis.selectList("Detail.getExciteByKeyword",search);
	}
	
	public int getCount(Map<String, Object> data) {
		return mybatis.selectOne("Detail.getCount",data);
	}
	
	public int getTotalLikes(int seq) {
		return mybatis.selectOne("Detail.getTotalLikes",seq);
	}
	
	public boolean getIsLike(Map<String, Object> data) {
		return mybatis.selectOne("Detail.getIsLike",data);
	}
	
	public void inputLike(Map<String, Object> data) {
		mybatis.insert("Detail.inputLike",data);
	}
	
	public void deleteLike(Map<String, Object> data) {
		mybatis.delete("Detail.deleteLike",data);
	}
	
	public List<Integer> getUserLikedReviews(Map<String, Object> data) {
		return mybatis.selectList("Detail.getUserLikedReviews",data);
	}
	
	public void updateReviewLikes(Map<String, Object> data) {
		mybatis.insert("Detail.updateReviewLikes",data);
	}
	
	public void deleteReviewLikes(Map<String, Object> data) {
		mybatis.delete("Detail.deleteReviewLikes",data);
	}

}
