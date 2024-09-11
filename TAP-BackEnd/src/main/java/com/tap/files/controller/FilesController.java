package com.tap.files.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.tap.files.dto.FilesDTO;
import com.tap.files.service.FilesService;


@RestController
@RequestMapping("/file")
public class FilesController {
	
	@Autowired
	private Storage storage;
	@Autowired
	private FilesService fServ;
	
	@PostMapping("/{path}")
	public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file, @PathVariable String path) {
		System.out.println(" test: " +file.getOriginalFilename());
		try {
			String bucketName = "exam-attachment-study";
		
			//파일유효아이디
			String sysname = path+"/"+UUID.randomUUID().toString();
			
			//업로드 하기 위한 정보 객체 생성
			BlobId blobId = BlobId.of(bucketName, sysname);
			BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
			
			// 실제 gcs에 업로드 하는 코드
			storage.create(blobInfo, file.getBytes());
			
			// DB 저장
			FilesDTO dto = new FilesDTO();
			dto.setFiles_oriname(file.getOriginalFilename());
			dto.setFiles_sysname(sysname);
//			fserv.upload(dto);
			return ResponseEntity.ok("http://storage.googleapis.com/exam-attachment-study/"+sysname);
		}catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body("Faled to upload");
		}
	}

}
