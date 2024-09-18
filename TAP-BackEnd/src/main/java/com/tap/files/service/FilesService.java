package com.tap.files.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.files.dao.FilesDAO;
import com.tap.files.dto.FilesDTO;

@Service
public class FilesService {
	
	@Autowired
	private FilesDAO fdao;
	
	public List<FilesDTO> selectByParentSeq(int parentSeq) {
		return fdao.selectByParentSeq(parentSeq);
	}
	
	
}
