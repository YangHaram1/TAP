package com.tap.chatupload.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.tap.chat.dao.ChatDAO;
import com.tap.chat.dto.ChatDTO;
import com.tap.chatupload.dao.ChatUploadDAO;
import com.tap.chatupload.dto.ChatUploadDTO;

@Service
public class ChatUploadService {
	
	@Autowired
	private ChatDAO cdao;
	@Autowired
	private ChatUploadDAO dao;
	
	@Autowired
	private Storage storage;
	
	public void insert(ChatUploadDTO dto) throws Exception{
		dao.insert(dto);
	}
	
	@Transactional
	public List<ChatDTO> upload(MultipartFile[] files, int group_seq, String username) throws Exception{
		
			List<ChatDTO> uploadList = new ArrayList<>();
			String bucketName = "exam-attachment-study";
			// 실제 gcs에 업로드 하는 코드
			for (MultipartFile file : files) {
				if (file.getSize() == 0) {
					continue;
				}
				// 파일유효아이디
				String sysname = "chat/" + UUID.randomUUID().toString();
				String oriname=file.getOriginalFilename();
				int code = processFile(file);
				// 업로드 하기 위한 정보 객체 생성
				BlobId blobId = BlobId.of(bucketName, sysname);
				BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
				storage.create(blobInfo, file.getBytes());

				// DB 저장
				
				ChatUploadDTO dto = new ChatUploadDTO();
				dto.setOriname(oriname);
				dto.setSysname(sysname);
				dto.setMember_id(username);
				dto.setGroup_seq(group_seq);
				dto.setCode(code);
				int uploadSeq=dao.insert(dto);
				System.out.println(uploadSeq);
				String fileMessage = oriname + "*" + sysname + "*" + code;
				ChatDTO cdto = new ChatDTO(0, username, fileMessage, null, group_seq, uploadSeq);
				cdto = cdao.insert(cdto);
				uploadList.add(cdto);
				
			}
			return uploadList;
	
	}
	
	public String determineFileType(MultipartFile file) {// 파일타입 구별하기
		String contentType = file.getContentType();

		// MIME 타입으로 확인
		if (contentType != null && contentType.startsWith("image/")) {
			return "IMAGE";
		}

		// 파일 확장자로 확인 (보완적인 방법)
		String originalFilename = file.getOriginalFilename();
		if (originalFilename != null && originalFilename.matches(".*\\.(jpg|jpeg|png|gif)$")) {
			return "IMAGE";
		}

		return "NON_IMAGE";
	}

	
	public int processFile(MultipartFile file) {// 구별후 처리 로직
		String fileType = determineFileType(file);
		if ("IMAGE".equals(fileType)) {
			// 이미지 파일 처리 로직
			return 1;//ImageConfig.image
		} else {
			// 비 이미지 파일 처리 로직
			return 2;//ImageConfig.file
		}
	}

}
