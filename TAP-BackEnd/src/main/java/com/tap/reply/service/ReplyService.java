package com.tap.reply.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.inquiry.dao.InquiryDAO;
import com.tap.reply.dao.ReplyDAO;
import com.tap.reply.dto.ReplyDTO;

import jakarta.transaction.Transactional;

@Service
public class ReplyService {
	
	@Autowired
	private ReplyDAO rdao;
	
	@Autowired
	private InquiryDAO idao;

	public ReplyDTO selectByParentSeq(int parentSeq) {
		return rdao.selectByParentSeq(parentSeq);
	}
	
	@Transactional
	public int insert(ReplyDTO dto) {
		
		idao.updateStatus(dto.getParent_seq());
		return rdao.insert(dto);
		
	}
}
