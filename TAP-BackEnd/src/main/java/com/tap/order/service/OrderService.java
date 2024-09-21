package com.tap.order.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tap.order.dao.OrderDAO;
import com.tap.order.dto.PlaceAndSectionDTO;
import com.tap.order.dto.SectionInnerDataDTO;

@Service
public class OrderService {
	
	@Autowired
	private OrderDAO oDao;
	
	public List<PlaceAndSectionDTO> getSection(int placeSeq){
		return oDao.getSection(placeSeq);
	}
	
	public List<SectionInnerDataDTO> getInnerData(int placeSeq){
		return oDao.getInnerData(placeSeq);
	}
	
	public List<Map<String, Object>> getDate(int seq){
		return oDao.getDate(seq);
	}
	
	public List<String> getTime(Map<String,Object> map){
		return oDao.getTime(map);
	}
	
	public int getPoint(String id) {
		return oDao.getPoint(id);
	}
	
	@Transactional
	public void insertOrder(Map<String,Object> orderData) {
		
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
	                      Integer.parseInt(orderData.get("deliverySeq").toString()) : 0;
	    
	    String pay = (String) orderData.get("pay");
	    String deliveryMethod = (String) orderData.get("deliveryMethod");
	    String id = (String) orderData.get("id");
	    
	    
	    // 1. order 테이블에 데이터 넣기(orderSeq 받아오기)
	    int orderSeq = oDao.insertOrder(orderData);
	    System.out.println("order성공");
	    
	    // 2. orderseq 받아오기 book 테이블에 좌석 넣기
	    SimpleDateFormat dateFormat = new SimpleDateFormat("yyMMdd");
	    String currentDate = dateFormat.format(new Date());  // ex: "240921"
	    String bookSeq = orderSeq + "-" + currentDate + "-" + seq; // ex: "1001-240921-1040"
	    System.out.println("생성된 bookSeq: " + bookSeq);
	    
	    
	    for (int i = 0; i < storageSeats.size(); i++) {
	    	
	        Map<String, Object> map = storageSeats.get(i);
	    	map.put("id", id);
			map.put("orderSeq", orderSeq);
			map.put("bookSeq", bookSeq+"-"+(i+1)); // ex: "1001-240921-1040-1"
			map.put("date", date);
			map.put("time", time);
			map.put("storageSection",storageSection);
			
			
			String seatId = (String) map.get("seatId");
		    String[] seatParts = seatId.split("-");
		    
		    String row = seatParts[0]; // "3"이 row
		    String col = seatParts[1]; // "7"이 col
		    map.put("row", row);
		    map.put("col", col);
			
			oDao.insertBook(map);
			System.out.println("좌석 넣는 중: " + map);
		}
	    System.out.println("book성공");
	    
	    // 3. pay가 point일 경우 totalPrice 만큼 차감하기
	    int point = oDao.getPoint(id);
	    int updatePoint = point-totalPrice;
	    oDao.updatePoint(updatePoint, id);
	}
}
