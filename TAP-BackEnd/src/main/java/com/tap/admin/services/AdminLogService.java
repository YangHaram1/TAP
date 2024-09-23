package com.tap.admin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tap.admin.dao.AdminLogDAO;
import com.tap.admin.dto.AdminLogDTO;
import com.tap.admin.dto.AdminLogSearchDTO;

@Service
public class AdminLogService {

	@Autowired
	private AdminLogDAO adminlogDAO;
	
	public void insertLog(AdminLogDTO logdto) {
	    adminlogDAO.insertLog(logdto);
	}
	
	public PageInfo<AdminLogDTO> getAllLog(int page, int size){
		PageHelper.orderBy("log_seq desc");
		PageHelper.startPage(page,size);			
		List<AdminLogDTO> logs = adminlogDAO.getAllLog();
		return new PageInfo<>(logs);		
	}
	
	public PageInfo<AdminLogDTO> getSearchLog(AdminLogSearchDTO logsearchdto, int page, int size) {
		
        PageHelper.startPage(page, size);
        List<AdminLogDTO> logs = adminlogDAO.getSearchLog(logsearchdto);
        return new PageInfo<>(logs);
    }
}

