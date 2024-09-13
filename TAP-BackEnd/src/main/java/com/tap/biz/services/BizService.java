package com.tap.biz.services;


import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.biz.dao.BizDAO;
import com.tap.biz.dto.BizApplyDTO;
import com.tap.biz.dto.CastingDataDTO;
import com.tap.biz.dto.TestClobDTO;
import com.tap.biz.dto.TotalScheduleDTO;
import com.tap.files.dto.FilesDTO;


@Service
public class BizService {
	@Autowired
	private BizDAO bizdao;
	public List<HashMap<String, Object>> getAllCategory(){
		return bizdao.getAllCategory();
	}
	public List<HashMap<String, Object>> getAllSubCategory(){
		return bizdao.getAllSubCategory();
	}
	public List<HashMap<String, Object>> getAllLocation(){
		return bizdao.getAllLocation();
	}
	public List<HashMap<String, Object>> getAllGenre(){
		return bizdao.getAllGenre();
	}
	public List<HashMap<String, Object>> getAllTeam(){
		return bizdao.getAllTeam();
	}
	public List<HashMap<String, Object>> getAllTeamLocation(){
		return bizdao.getAllTeamLocation();
	}
	public List<HashMap<String, Object>> getAllSeats(){
		return bizdao.getAllSeats();
	}
	public List<HashMap<String, Object>> getAllPrices(){
		return bizdao.getAllPrices();
	}
	public List<HashMap<String, Object>> getProductByName(String name){
		return bizdao.getProductByName(name);
	}
	public void createSale(List<HashMap<String, Object>> saleDataList) {
        for (HashMap<String, Object> saleData : saleDataList) {
            bizdao.createSale(saleData); 
        }
    }
	
	public List<TestClobDTO> getContent(){
		return bizdao.getContent();
	}
	
	public int createApply(BizApplyDTO formData) {
		bizdao.createApply(formData);
		int newPopSeq = formData.getApplication_seq();
		return newPopSeq;
	}
	public void createApplySchedule(TotalScheduleDTO dto) {
		bizdao.createApplySchedule(dto);
	}
	public void createApplyCasting(CastingDataDTO dto) {
		bizdao.createApplyCasting(dto);
	}
	public void createApplyNotice(String content, int applicationSeq) {
		bizdao.createApplyNotice(content, applicationSeq);
	}
	public void createApplyFiles(FilesDTO main_poster, int applicationSeq) {
		bizdao.createApplyFilesMain(main_poster, applicationSeq);
	}
	public void createApplyDescription(String detailed, int applicationSeq) {
		bizdao.createApplyDescription(detailed, applicationSeq);
	}
	
	
	
}
