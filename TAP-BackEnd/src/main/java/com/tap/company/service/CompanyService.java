package com.tap.company.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.tap.company.dao.CompanyDAO;
import com.tap.company.dto.CompanyDTO;
import com.tap.files.dao.FilesDAO;
import com.tap.files.dto.FilesDTO;
import com.tap.members.dao.MembersDAO;
import com.tap.members.dto.MembersDTO;

import jakarta.transaction.Transactional;

@Service
public class CompanyService {

	@Autowired
	private CompanyDAO dao;

	@Autowired
	private MembersDAO mdao;

	@Autowired
	private FilesDAO fdao;

	@Autowired
	private Storage storage;

	// 회원가입 등록
	@Transactional
	public void signUp(CompanyDTO cdto, MembersDTO mdto, MultipartFile file) throws Exception {
		
		cdto.setMember_id(mdto.getId());
		String bucketName = "exam-attachment-study";
		// 파일유효아이디
		String sysname = "bizzRegist" + "/" + UUID.randomUUID().toString();
		String oriname=file.getOriginalFilename();
		System.out.println(oriname);
		// 업로드 하기 위한 정보 객체 생성
		BlobId blobId = BlobId.of(bucketName, sysname);
		BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
		// 실제 gcs에 업로드 하는 코드
		storage.create(blobInfo, file.getBytes());

		// DB 저장
		FilesDTO fdto = new FilesDTO();
		fdto.setFiles_oriname(oriname);
		fdto.setFiles_sysname(sysname);
		fdto.setFiles_parent_seq(0);
		fdto.setFiles_type("bizz_rigistor");
		fdto.setFiles_from(cdto.getMember_id());
		
		fdao.insertBizz(fdto);
		
		mdao.signUpBiz(mdto);
		dao.signUp(cdto);

	}
	// 회원가입 사업체 이름 중복 검사
	public int checkName(String name) throws Exception{
		System.out.println(name);
		return dao.checkName(name);
	}
	public CompanyDTO getCompanyData(String id) {
		return dao.getCompanyData(id);
	}

}
