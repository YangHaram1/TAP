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

import com.tap.detail.dto.SeatsDTO;
import com.tap.detail.service.SeatsService;
import com.tap.members.dto.MembersDTO;
import com.tap.members.service.MembersService;
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
	
	@GetMapping("/{placeSeq}")
	public Map<String,?> getSeatData(@PathVariable int placeSeq){
		
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
	
	
	
	
	
	// 주문 테이블에 데이터 넣기
	@PostMapping("/orderFinal")
	public ResponseEntity<Void> orderFinal(@RequestBody Map<String,Object> orderData, Principal principal){
		
		System.out.println("여기들어왔쏭");
		if (principal == null) {
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		System.out.println("getpoint id 확인 "+username);
		
		orderData.put("id", username);
		
		int seq = Integer.parseInt(orderData.get("seq").toString());
	    String date = (String) orderData.get("date");
	    String time = (String) orderData.get("time");
	    int storageSection = Integer.parseInt(orderData.get("storageSection").toString());
	    List<Map<String, Object>> storageSeats = (List) orderData.get("storageSeats");
	    int totalPrice = Integer.parseInt(orderData.get("totalPrice").toString());
	    String status = (String) orderData.get("status");
	    
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
	            "------------------------------------");
	    oServ.insertOrder(orderData);
		return ResponseEntity.ok().build();
		
	}
	

}
