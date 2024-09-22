package com.tap.grade.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.grade.dao.GradeDAO;
import com.tap.grade.dto.GradeDTO;
@Service
public class GradeService {
	@Autowired
	private GradeDAO gDao;
    public List<GradeDTO> getGrade(){
    	return gDao.getGrade();
    }
	public List<GradeDTO> selectAll() {
		return gDao.selectAll();
		}

}
