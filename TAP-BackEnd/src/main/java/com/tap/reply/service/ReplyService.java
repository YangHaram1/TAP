package com.tap.reply.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.reply.dao.ReplyDAO;
import com.tap.reply.dto.ReplyDTO;

@Service
public class ReplyService {
	
	@Autowired
	private ReplyDAO rdao;

	public ReplyDTO selectByParentSeq(int parentSeq) {
		return rdao.selectByParentSeq(parentSeq);
	}
}
