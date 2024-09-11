package com.tap.biz.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.tap.chatupload.dto.ChatUploadDTO;
import com.tap.chatupload.service.ChatUploadService;
import com.tap.files.service.FilesService;

@RestController
@RequestMapping("/bizUpload")
public class BizDesUploadController {
	@Autowired
	private Storage storage;
	@Autowired
	private ChatUploadService cserv;
	
	@PostMapping
	public ResponseEntity<List<String>> upload(@RequestParam int group_seq, @RequestParam MultipartFile[] files,Principal principal) {
		
		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		System.out.println(username);
		try {
			List<String> result =new ArrayList<>();
			String bucketName = "exam-attachment-study";
			
		
			
			// 실제 gcs에 업로드 하는 코드
			for (MultipartFile file : files) {
				if (file.getSize() == 0) {
					continue;
				}
				//파일유효아이디
				String sysname = "desc/"+UUID.randomUUID().toString();
				
				//업로드 하기 위한 정보 객체 생성
				BlobId blobId = BlobId.of(bucketName, sysname);
				BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
				storage.create(blobInfo, file.getBytes());
				
				// DB 저장
				System.out.println(file.getOriginalFilename());
//				ChatUploadDTO dto = new ChatUploadDTO();
//				dto.setOriname(file.getOriginalFilename());
//				dto.setSysname(sysname);
//				dto.setMember_id(username);
//				dto.setGroup_seq(group_seq);
//				dto.setCode(0);
				String url="http://storage.googleapis.com/exam-attachment-study/"+sysname;
//				cserv.insert(dto);
				result.add(url);
			}
			return ResponseEntity.ok(result);
			
		}catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok(null);
		}
	}
}
