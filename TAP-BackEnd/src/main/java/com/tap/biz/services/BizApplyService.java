package com.tap.biz.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tap.biz.dao.BizDAO;
import com.tap.biz.dto.BizApplyDTO;
import com.tap.biz.dto.CastingDataDTO;
import com.tap.biz.dto.TotalScheduleDTO;
import com.tap.files.dto.FilesDTO;

@Service
public class BizApplyService {

	@Autowired
	private BizDAO bizdao;
	
	@Transactional
	public void insertEvent(BizApplyDTO formData) {
		// Apply 테이블에 삽입 ==================================
				int applicationSeq = bizdao.createApply(formData); // apply테이블에 insert하고 시퀀스 돌려받기. 
				System.out.println(applicationSeq);
				
				
				// Schedule 테이블에 삽입 ======================================
				List<TotalScheduleDTO> t_list = formData.getTotalSchedule();
				for(int i=0; i<t_list.size(); i++) {
					TotalScheduleDTO t_dto = t_list.get(i);
					t_dto.setApplication_seq(applicationSeq);
					bizdao.createApplySchedule(t_dto);
				}
				
				// Casting 테이블에 삽입 ==========================================
				if(formData.getCastingData() != null ) {
					List<CastingDataDTO> c_list = formData.getCastingData();
					for(int i=0; i<c_list.size(); i++) {
						CastingDataDTO c_dto = c_list.get(i);
						c_dto.setApplication_seq(applicationSeq);
						bizdao.createApplyCasting(c_dto);
					}
				}
			
				
				// Event_popup 테이블에 삽입 ===================================
				String content = formData.getNoticeContent();
				System.out.println("s공지 내용 : "+content);
				bizdao.createApplyNotice(content, applicationSeq);
				// File에 메인포스터 삽입 ===================================
				FilesDTO main_poster = formData.getMain_poster();
				System.out.println("메인포스터 : "+ main_poster.getFiles_oriname());
				System.out.println("메인포스터 : "+ main_poster.getFiles_sysname());
				bizdao.createApplyFilesMain(main_poster, applicationSeq);
				// String : detailedDescription에 상세이미지 content 가져오기.. ================================
				String detailed = formData.getDescription_content();
				System.out.println("상세 내용 : "+ detailed);
				bizdao.createApplyDescription(detailed, applicationSeq);
		
	}
}
