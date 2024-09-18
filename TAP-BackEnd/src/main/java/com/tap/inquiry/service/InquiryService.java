package com.tap.inquiry.service;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.tap.files.dao.FilesDAO;
import com.tap.files.dto.FilesDTO;
import com.tap.inquiry.dao.InquiryDAO;
import com.tap.inquiry.dto.InquiryDTO;

import jakarta.transaction.Transactional;

@Service
public class InquiryService {
	@Autowired
	private InquiryDAO dao;
	
	@Autowired
	private Storage storage;
	
	@Autowired
	private FilesDAO fdao;
	

	@Transactional
	public void insert(InquiryDTO dto,MultipartFile[] files) throws Exception {
		String bucketName = "exam-attachment-study";
		// 파일유효아이디
		String sysname = "inquiry" + "/" + UUID.randomUUID().toString();
		
		if(files!=null) {
			int seq=dao.insert(dto);
			for (MultipartFile file : files) {
				if (file.getSize() == 0) {
					continue;
				}
				String oriname=file.getOriginalFilename();
				// 업로드 하기 위한 정보 객체 생성
				BlobId blobId = BlobId.of(bucketName, sysname);
				BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
				// 실제 gcs에 업로드 하는 코드
				storage.create(blobInfo, file.getBytes());

				
				
				// DB 저장
				FilesDTO fdto = new FilesDTO();
				fdto.setFiles_oriname(oriname);
				fdto.setFiles_sysname(sysname);
				fdto.setFiles_parent_seq(seq);
				fdto.setFiles_type("inquiry");
				fdto.setFiles_from(dto.getMember_id());
				fdao.insertBizz(fdto);
				
			}
		}
		else {
			dao.insert(dto);
		}
		
		
		
	}


	public List<InquiryDTO> selectById(String username) {
		return dao.selectById(username);
	}


	public InquiryDTO selectBySeq(int seq) {
		return dao.selectBySeq(seq);
	}
}
