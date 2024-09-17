package com.tap.inquiry.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.inquiry.dao.InquiryDAO;
import com.tap.inquiry.dto.InquiryDTO;

@Service
public class InquiryService {
	@Autowired
	private InquiryDAO dao;

	public void insert(InquiryDTO dto) {
		// TODO Auto-generated method stub
		
	}
}
