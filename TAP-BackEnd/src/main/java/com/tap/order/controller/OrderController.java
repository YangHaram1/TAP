package com.tap.order.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tap.coupon.dto.CouponTypeDTO;
import com.tap.coupon.service.CouponService;
import com.tap.coupon.service.CouponTypeService;
import com.tap.detail.dto.SeatsDTO;
import com.tap.detail.service.SeatsService;
import com.tap.members.dto.MembersDTO;
import com.tap.members.dto.MembersGradeDTO;
import com.tap.members.service.MembersService;
import com.tap.order.dto.BookSeatsDTO;
import com.tap.order.dto.OrdersDTO;
import com.tap.order.dto.PlaceAndSectionDTO;
import com.tap.order.dto.SectionInnerDataDTO;
import com.tap.order.service.OrderService;

@RestController
@RequestMapping("/order")
public class OrderController {
	
	@Autowired
	private OrderService oServ;
	@Autowired
	private SeatsService sServ;
	@Autowired
	private MembersService mServ;
	@Autowired
	private CouponTypeService ctServ;
	
	@GetMapping("/{placeSeq}")
	public Map<String,?> getSeatData(@PathVariable int placeSeq){
		
		System.out.println("장소 번호"+placeSeq);
		Map map = new HashMap<>();
		
		// 섹션 정보 (총 좌석수, 섹션이름, 공연장 모양, 섹션별 행, 열)
		List<PlaceAndSectionDTO> section = oServ.getSection(placeSeq);
		// 섹션 내부 정보 (좌석)
		List<SectionInnerDataDTO> sectionInnerData = oServ.getInnerData(placeSeq);
		// 좌석 가격
		List<SeatsDTO> seats = sServ.getPrice(placeSeq);
		
		map.put("section", section);
		map.put("sectionInnerData", sectionInnerData);
		map.put("seats", seats);
		
		return map;	
	}
	
	@GetMapping("/getDate")
	public ResponseEntity<Map<String, ?>> getDate(@RequestParam int seq){
		Map map = new HashMap<>();		
		List<Map<String,Object>> dateList = oServ.getDate(seq); 		
		map.put("dateList", dateList);	
		return ResponseEntity.ok(map);
	}
	
	@GetMapping("/getTime")
	public List<String> getTime(@RequestParam String date, @RequestParam int seq){
			
		String onlyDate = date.substring(0, 10);
		System.out.println(onlyDate);
		
		Map<String,Object> map = new HashMap<>();
		map.put("date",onlyDate);
		map.put("seq", seq);
		
		List<String> timeList = oServ.getTime(map);
		return timeList;		
	}  
	
	@GetMapping("/getPoint")
	public ResponseEntity<Integer> getPoint(Principal principal) throws Exception {
		if (principal == null) {
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		System.out.println("getpoint id 확인 "+username);
		
		int point = oServ.getPoint(username);
		

		return ResponseEntity.ok(point);
	}
	
	@GetMapping("/getReview/{seq}")
	public List<OrdersDTO> getBook(@PathVariable int seq, Principal principal){
		
		List<OrdersDTO> list = new ArrayList<>();
		Map<String,Object> map = new HashMap<>();
		
		System.out.println("주문번호 확인 여기들어왔쏭");
		
		if (principal == null) {
			list=null;
			return list;
		}
		String username = principal.getName();		
		
		map.put("id",username);
		map.put("seq", seq);
		list = oServ.getOrder(map);
		
		return list;
		
	}
	
	@GetMapping("/getBookSeats")
	public List<BookSeatsDTO> getBookSeats(@RequestParam int seq,@RequestParam String date ,@RequestParam String time ){

		Map<String, Object> map = new HashMap<>();
		map.put("date",date);
		map.put("time",time);
		map.put("seq",seq);
		
		List<BookSeatsDTO> booklist = oServ.getBookSeats(map);
		return booklist;
	}
	
	@PostMapping("/checkSeat")
	public int checkSeat(@RequestBody Map<String,Object> orderData) {
		int count = oServ.checkSeat(orderData);
		System.out.println("중복된 좌석 유뮤 " + count);
		return count;
	}

	
	
	// 주문 테이블에 데이터 넣기
	@PostMapping("/orderFinal")
	public ResponseEntity<Void> orderFinal(@RequestBody Map<String,Object> orderData, Principal principal){
		System.out.println("좌석 넣는 구간 들어왔지요");
		
		if (principal == null) {
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		orderData.put("id", username);
		
		int seq = Integer.parseInt(orderData.get("seq").toString());
	    String date = (String) orderData.get("date");
	    String time = (String) orderData.get("time");
	    int storageSection = Integer.parseInt(orderData.get("storageSection").toString());
	    List<Map<String, Object>> storageSeats = (List) orderData.get("storageSeats");
	    int totalPrice = Integer.parseInt(orderData.get("totalPrice").toString());
	    String status = (String) orderData.get("status");
	    int couponSeq = orderData.get("couponSeq") != null ? 
                Integer.parseInt(orderData.get("couponSeq").toString()) : 0;
	    
	    // deliveryStatus와 deliverySeq가 null일 경우 기본값 설정
	    String deliveryStatus = orderData.get("deliveryStatus") != null ? 
	                            (String) orderData.get("deliveryStatus") : "";
	    int deliverySeq = orderData.get("deliverySeq") != null ? 
	                      Integer.parseInt(orderData.get("deliverySeq").toString()) : -1;
	    
	    String pay = (String) orderData.get("pay");
	    String deliveryMethod = (String) orderData.get("deliveryMethod");		
		
	    System.out.println("주문 데이터 확인: \n" +
	            "------------------------------------\n" +
	            "상품 번호 (seq): " + seq + "\n" +
	            "날짜 (date): " + date + "\n" +
	            "시간 (time): " + time + "\n" +
	            "좌석 구역 (storageSection): " + storageSection + "\n" +
	            "선택 좌석 (storageSeats): " + storageSeats + "\n" +
	            "총 가격 (totalPrice): " + totalPrice + "\n" +
	            "주문 상태 (status): " + status + "\n" +
	            "배송 상태 (deliveryStatus): " + deliveryStatus + "\n" +
	            "결제 방법 (pay): " + pay + "\n" +
	            "수령 방법 (deliveryMethod): " + deliveryMethod + "\n" +
	            "배송 번호 (deliverySeq): " + deliverySeq + "\n" +
	            "쿠폰 번호 (couponSeq): " + couponSeq + "\n" +
	            "------------------------------------");
	    oServ.insertOrder(orderData);
	    
		return ResponseEntity.ok().build();
		
	}
	
	@PostMapping("/write")
	public ResponseEntity<Void> write(@RequestBody Map<String,Object> data, Principal principal){
		
		// data => 카테고리, 상품번호, 제목, 내용 (+별점, 주문번호)
		
		if (principal == null) {
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		data.put("id", username);
		
		System.out.println("Received data:");
		System.out.println("Username: " + username);
		System.out.println("Category: " + data.get("category"));
		System.out.println("Title: " + data.get("title"));
		System.out.println("Content: " + data.get("content"));
		System.out.println("Seq: " + data.get("seq"));
		
		String category = (String) data.get("category");
//		String title = (String) data.get("title");
//		String content = (String) data.get("content");
//		int seq = data.get("seq") != null ? 
//                Integer.parseInt(data.get("seq").toString()) : 0;
		
		if(category.equals("review")) {
//			int orderSeq = data.get("orderSeq") != null ? 
//	                Integer.parseInt(data.get("orderSeq").toString()) : 0;
//			int star = data.get("star") != null ? 
//	                Integer.parseInt(data.get("star").toString()) : 0;
			
			oServ.insertReview(data);
			
		}else if(category.equals("excite")) {
			oServ.insertExcite(data);
		}
		
		
		return ResponseEntity.ok().build();
	}
	
	
	@GetMapping("/type/members")
	public ResponseEntity<List<CouponTypeDTO>> getType(Principal principal) throws Exception{
		
		System.out.println("쿠폰 받으러 들어왔음!!!!");
		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.ok(null);
		}
		String username =principal.getName();
		MembersGradeDTO dto = mServ.getMemberInfo(username);
		
		System.out.println(username + ":" + dto.getGrade_order());
		Map<String, Object> map = new HashMap<>();
		map.put("id",username);
		map.put("seq", dto.getGrade_order());
		
		
		List<CouponTypeDTO> list = oServ.selectByOrder(map);	
		
		return ResponseEntity.ok(list);
	}

}
