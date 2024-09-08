//package com.tap.files.controller;
//
//import java.util.UUID;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.google.cloud.storage.BlobId;
//import com.google.cloud.storage.BlobInfo;
//import com.google.cloud.storage.Storage;
//import com.tap.files.dto.FilesDTO;
//import com.tap.files.service.FilesService;
//
//@RestController
//@RequestMapping("/file")
//public class FileTestController {
//	@Autowired
//    private Storage storage;
//    
//    @Autowired
//    private FilesService fServ;
//
//    @PostMapping
//    public ResponseEntity<String> upload(
//        @RequestParam("file") MultipartFile file,
//        @RequestParam("files_type") String filesType,
//        @RequestParam("files_from") String filesFrom,
//        @RequestParam("files_parent_seq") String filesParentSeq) {
//
//        try {
//            String bucketName = "exam-attachment-study";
//            String sysname = "musical/" + UUID.randomUUID().toString();
//
//            // GCS에 업로드하기 위한 정보 객체 생성
//            BlobId blobId = BlobId.of(bucketName, sysname);
//            BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
//
//            // 실제 GCS에 파일 업로드
//            storage.create(blobInfo, file.getBytes());
//
//            // 파일 정보 DB에 저장
//            FilesDTO dto = new FilesDTO();
//            dto.setFiles_oriname(file.getOriginalFilename());
//            dto.setFiles_sysname(sysname);
//            dto.setFiles_type(filesType);
//            dto.setFiles_from(filesFrom);
//            dto.setFiles_parnet_seq(filesParentSeq);
//
////            fServ.upload(dto); // DB 저장 메소드 호출
//
//            return ResponseEntity.ok("http://storage.googleapis.com/" + bucketName + "/" + sysname);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.badRequest().body("업로드 실패");
//        }
//    }
//}