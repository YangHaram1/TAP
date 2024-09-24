package com.tap.detail.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tap.company.dto.CompanyDTO;
import com.tap.company.service.CompanyService;
import com.tap.detail.dto.CastingDTO;
import com.tap.detail.dto.DescriptionDTO;
import com.tap.detail.dto.DetailDTO;
import com.tap.detail.dto.ExciteDTO;
import com.tap.detail.dto.ReviewStarDTO;
import com.tap.detail.dto.ScheduleAndCastingDTO;
import com.tap.detail.dto.SeatsDTO;
import com.tap.detail.service.DescriptionService;
import com.tap.detail.service.DetailService;
import com.tap.detail.service.SeatsService;
import com.tap.members.dto.MembersDTO;
import com.tap.members.service.MembersService;

@RestController
@RequestMapping("/detail")
public class DetailController {
	
	@Autowired
	private DetailService dServ;
	@Autowired
	private DescriptionService dcServ;
	@Autowired
	private SeatsService sServ;
	@Autowired
	private MembersService mServ;
	@Autowired
	private CompanyService cServ;
	
	
	@GetMapping("/{seq}")
	public Map<String,?> getDetailData(@PathVariable int seq) {
		System.out.println("상세페이지 번호"+seq);
		Map map = new HashMap<>();
		MembersDTO memberData = new MembersDTO();
		CompanyDTO companyData = new CompanyDTO();
		
		
		//상세페이지 메인 정보 (apply)
		DetailDTO mainData = dServ.getDetailData(seq);
		//상세페이지 공지사항 & 상세정보 (description)
		DescriptionDTO description = dcServ.getContent(seq);
		//좌석 가격
		List<SeatsDTO> seats = sServ.getPrice(mainData.getPlace_seq());
		//캐스팅
		List<CastingDTO> casting = dServ.getCasting(seq);
		//회사정보
		try {
			memberData = mServ.selectById(mainData.getId()); // 기본 정보(이메일, 대표이름)
			companyData = cServ.getCompanyData(mainData.getId()); // 사업체 정보
		}catch(Exception e) {
			System.out.println("회사정보 불러오기 오류 발생");
		}
		//회차정보
		List<String> days = dServ.getDays(seq);
		List<String> times = dServ.getTimes(seq);
		
		List<ScheduleAndCastingDTO> castingAndDate = new ArrayList<>();
		
		//뮤지컬일 떄
		if(mainData.getSub_category_seq() == 1) {
			castingAndDate = dServ.getCastingAndDate(seq);
		}else{
			castingAndDate = dServ.getCastingAndDateNotArt(seq);
		}
		
		// 후기
		List<ReviewStarDTO> reviewList = dServ.getReview(seq);
		// 기대평
		List<ExciteDTO> exciteList = dServ.getExcite(seq);
		// 관심수
		int totalLikes = dServ.getTotalLikes(seq);
		
		map.put("mainData", mainData);
		map.put("description", description);
		map.put("seats", seats);
		map.put("casting",casting);
		map.put("memberData", memberData);
		map.put("companyData", companyData);
		map.put("times", times);
		map.put("days", days);
		map.put("castingAndDate", castingAndDate);
		map.put("reviewList", reviewList);
		map.put("exciteList", exciteList);
		map.put("totalLikes",totalLikes);
		
		return map;
		
	}
	
	@GetMapping("/getReviewByKeyword")
	public Map<String, Object> getReviewByKeyword(@RequestParam int start,@RequestParam int end,@RequestParam String keyword, @RequestParam int seq ){
		// 키워드별 정렬
		// 기본값은 최신순
		// keyword = "review_date, stars"
		
		Map<String, Object> search = new HashMap<>();
		if(keyword.equals("최신순")) {
			keyword = "r.review_date";
		}else if(keyword.equals("별점순")) {
			keyword = "s.stars";
		}else {
			keyword = "r.review_date";
		}
		search.put("keyword",keyword);
		search.put("seq", seq);
		search.put("start", start);
		search.put("end", end);
		List<ReviewStarDTO> list = dServ.getReviewByKeyword(search);
		
		String table = "review";
		Map<String, Object> data = new HashMap<>();
		data.put("table",table);
		data.put("seq", seq);
		int count = dServ.getCount(data);
		
		Map<String, Object> map = new HashMap<>();
		map.put("list",list);
		map.put("count", count);

		System.out.println("review 요청 들어옴"+keyword);
		return map;
		
	}
	
	@GetMapping("/getExciteByKeyword")
	public Map<String, Object> getExciteByKeyword(@RequestParam int start,@RequestParam int end,@RequestParam String keyword, @RequestParam int seq ){

		Map<String, Object> search = new HashMap<>();
		if(keyword.equals("최신순")) {
			keyword = "excite_date";
//		}else if(keyword.equals("별점순")) {
//			keyword = "s.stars";
		}else {
			keyword = "excite_date";
		}
		search.put("keyword",keyword);
		search.put("seq", seq);
		search.put("start", start);
		search.put("end", end);
		List<ExciteDTO> list = dServ.getExciteByKeyword(search);
		
		String table = "excite";
		Map<String, Object> data = new HashMap<>();
		data.put("table",table);
		data.put("seq", seq);
		int count = dServ.getCount(data);
		
		Map<String, Object> map = new HashMap<>();
		map.put("list",list);
		map.put("count", count);
		System.out.println("excite 요청 들어옴");
		return map;
		
	}
	
	@GetMapping("/getLikes/{seq}")
	public Map<String, Object> getLikes(@PathVariable int seq, Principal principal){
		
		Map<String, Object> map = new HashMap<>();
		int totalLikes = dServ.getTotalLikes(seq);
		map.put("totalLikes",totalLikes);
		
		if (principal == null) {
			
			return map;
		}
		String username = principal.getName();
		System.out.println("getpoint id 확인 "+username);
		
		Map<String, Object> data = new HashMap<>();
		data.put("id",username);
		data.put("seq", seq);
		
		boolean isLike = dServ.getIsLike(data);
		map.put("isLike", isLike);
		
		return map;
		
	}
	
	@PostMapping("/inputLike/{seq}")
	public ResponseEntity<Void> inputLike(@PathVariable int seq, Principal principal){
		
		System.out.println("seq"+seq);
		Map<String, Object> map = new HashMap<>();
		if (principal == null) {
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		System.out.println("getpoint id 확인 "+username);
		
		map.put("id",username);
		map.put("seq", seq);
		
		dServ.inputLike(map);
		
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("/deleteLike/{seq}")
	public ResponseEntity<Void> deleteLike(@PathVariable int seq, Principal principal){
		System.out.println("seq"+seq);
		Map<String, Object> map = new HashMap<>();
		if (principal == null) {
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		System.out.println("getpoint id 확인 "+username);
		
		map.put("id",username);
		map.put("seq", seq);
		
		dServ.deleteLike(map);
		
		return ResponseEntity.ok().build();
	}
	
	// 댓글에서 공감이 되어있는 목록 출력
	@GetMapping("/getUserLikedReviews/{seq}")
	public ResponseEntity<List<Integer>> getUserLikedReviews(@PathVariable int seq, Principal principal) {
		
		System.out.println("작품 번호 seq"+seq);
		if (principal == null) {
			return ResponseEntity.ok(null);
		}
	    
	    String username = principal.getName();
	    
	    Map<String, Object> map = new HashMap<>();
	    map.put("id",username);
		map.put("seq", seq);
	    
	    // 예시: 사용자가 공감한 리뷰 ID를 리스트로 반환
	    List<Integer> likedReviewIds = dServ.getUserLikedReviews(map);
	    
	    System.out.println(ResponseEntity.ok(likedReviewIds));
	    return ResponseEntity.ok(likedReviewIds); // List<Integer>를 JSON 배열로 반환
	}
	
	// 댓글 공감 추가
	@PostMapping("/updateReviewLikes/{review_seq}")
	public ResponseEntity<Void> updateReviewLikes(@PathVariable int review_seq,Principal principal){
		
		System.out.println("추가 댓글 seq"+review_seq);
		Map<String, Object> map = new HashMap<>();
		if (principal == null) {
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		
		map.put("id",username);
		map.put("seq", review_seq);
		
		dServ.updateReviewLikes(map);
		
		return ResponseEntity.ok().build();
	}
	
	// 댓글 공감 삭제
	@DeleteMapping("/deleteReviewLikes/{review_seq}")
	public ResponseEntity<Void> deleteReviewLikes(@PathVariable int review_seq, Principal principal){
		
		System.out.println("삭제 댓글 seq"+review_seq);
		Map<String, Object> map = new HashMap<>();
		if (principal == null) {
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		
		map.put("id",username);
		map.put("seq", review_seq);
		
		dServ.deleteReviewLikes(map);
		
		return ResponseEntity.ok().build();
	}
	
	
	

}
