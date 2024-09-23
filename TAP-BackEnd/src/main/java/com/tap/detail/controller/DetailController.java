package com.tap.detail.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	

}
