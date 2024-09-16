package com.tap.biz.controller;

import java.security.Principal;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tap.biz.dto.BizApplyDTO;
import com.tap.biz.dto.CastingDataDTO;
import com.tap.biz.dto.TestClobDTO;
import com.tap.biz.dto.TotalScheduleDTO;
import com.tap.biz.services.BizService;
import com.tap.files.dto.FilesDTO;
import com.tap.members.service.MembersService;

@RestController
@RequestMapping("/biz/application")
public class BizApplyController {
	@Autowired
	private BizService bizServ;
	@Autowired
	private MembersService mserv;
	
	@GetMapping("/category")
	public ResponseEntity<List<HashMap<String, Object>>> getAllCategory(){
		return ResponseEntity.ok(bizServ.getAllCategory());
	}
	@GetMapping("/subcategory")
	public ResponseEntity<List<HashMap<String, Object>>> getAllSubCategory(){
		return ResponseEntity.ok(bizServ.getAllSubCategory());
	}
	@GetMapping("/location")
	public ResponseEntity<List<HashMap<String, Object>>> getAllLocation(){
		return ResponseEntity.ok(bizServ.getAllLocation());
	}
	@GetMapping("/genre")
	public ResponseEntity<List<HashMap<String, Object>>> getAllGenre(){
		return ResponseEntity.ok(bizServ.getAllGenre());
	}
	@GetMapping("/team")
	public ResponseEntity<List<HashMap<String, Object>>> getAllTeam(){
		return ResponseEntity.ok(bizServ.getAllTeam());
	}
	@GetMapping("/teamlocation")
	public ResponseEntity<List<HashMap<String, Object>>> getAllTeamLocation(){
		return ResponseEntity.ok(bizServ.getAllTeamLocation());
	}
	@GetMapping("/description")
	public ResponseEntity<List<TestClobDTO>> getContent(){
		return ResponseEntity.ok(bizServ.getContent());
	}
	@GetMapping("/seats")
	public ResponseEntity<List<HashMap<String, Object>>> getAllSeats(){
		return ResponseEntity.ok(bizServ.getAllSeats());
	}
	@GetMapping("/prices")
	public ResponseEntity<List<HashMap<String, Object>>> getAllPrices(){
		return ResponseEntity.ok(bizServ.getAllPrices());
	}
	
	// 세일신청할때 상품명 가져오기 -- 내가 등록한 상품만 가져와야함..(principle 사용하기_
	@GetMapping("/products")
    public ResponseEntity<List<HashMap<String, Object>>> getProductByName(Principal principal, @RequestParam String nameOrNumber) {
		if (principal == null) {
			System.out.println("principal");
			return null;
		}
		String username = principal.getName();
		UserDetails user = mserv.loadUserByUsername(username);
		String id = user.getUsername();
		System.out.println("아이디 : " + user.getUsername());
		System.out.println("name " + nameOrNumber);
		return ResponseEntity.ok(bizServ.getProductByName(nameOrNumber, user.getUsername()));
    }
	
	// 세일 신청하기 
	@PostMapping("/sale")
	public ResponseEntity<List<HashMap<String, Object>>> insertSale(
	    @RequestBody List<HashMap<String, Object>> saleDataList) {
	    bizServ.createSale(saleDataList);
	    // 처리 후 응답 반환
	    return ResponseEntity.ok(saleDataList);
	}
	
	// 상품 테이블에 insert POST
	@PostMapping
	public ResponseEntity<BizApplyDTO> insertEvent(@RequestBody BizApplyDTO formData){
		String id = formData.getId();
		Timestamp start_date = formData.getStart_date();
		int running_time = formData.getRunning_time();
		Timestamp open_date = formData.getOpen_date();
		System.out.println("ghkrd");
	
		
		// Apply 테이블에 삽입 ==================================
		int applicationSeq = bizServ.createApply(formData); // apply테이블에 insert하고 시퀀스 돌려받기. 
		System.out.println(applicationSeq);
		
		
		// Schedule 테이블에 삽입 ======================================
		List<TotalScheduleDTO> t_list = formData.getTotalSchedule();
		for(int i=0; i<t_list.size(); i++) {
			TotalScheduleDTO t_dto = t_list.get(i);
			t_dto.setApplication_seq(applicationSeq);
			bizServ.createApplySchedule(t_dto);
		}
		
		// Casting 테이블에 삽입 ==========================================
		if(formData.getCastingData() != null ) {
			List<CastingDataDTO> c_list = formData.getCastingData();
			for(int i=0; i<c_list.size(); i++) {
				CastingDataDTO c_dto = c_list.get(i);
				c_dto.setApplication_seq(applicationSeq);
				bizServ.createApplyCasting(c_dto);
			}
		}
	
		
		// Event_popup 테이블에 삽입 ===================================
		String content = formData.getNoticeContent();
		System.out.println("s공지 내용 : "+content);
		bizServ.createApplyNotice(content, applicationSeq);
		// File에 메인포스터 삽입 ===================================
		FilesDTO main_poster = formData.getMain_poster();
		System.out.println("메인포스터 : "+ main_poster.getFiles_oriname());
		System.out.println("메인포스터 : "+ main_poster.getFiles_sysname());
		bizServ.createApplyFiles(main_poster, applicationSeq);
		// String : detailedDescription에 상세이미지 content 가져오기.. ================================
		String detailed = formData.getDescription_content();
		System.out.println("상세 내용 : "+ detailed);
		bizServ.createApplyDescription(detailed, applicationSeq);

	//////////////////////////////////////////////////	
		
		return ResponseEntity.ok(formData);
	}
}
