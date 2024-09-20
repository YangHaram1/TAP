package com.tap.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tap.admin.services.AdminProductService;

@RestController
@RequestMapping("/admin/products")
public class AdminProductController {
	@Autowired
	private AdminProductService AdProServ;
	
	// 팝업 테스트 상품 공지사항 가져오기 
	@GetMapping("/event_popup")
	public ResponseEntity<String> getDescription(@RequestParam int application_seq) {
		 String description = AdProServ.getDescription(application_seq);

	    if (description == null || description.isEmpty()) {
	        // 데이터가 없을 때 204 No Content 반환
	        return ResponseEntity.noContent().build();
	    }
	    return ResponseEntity.ok(description);
	}

	
	
	// Count - 현재 상품 갯수
	@GetMapping("/count/current")
	public ResponseEntity<Integer> getCountCurrent(@RequestParam String category) {
		int count = AdProServ.getCountCurrent(category);
		return ResponseEntity.ok(count);
	}
	// Count - 예정 상품 갯수 
	@GetMapping("/count/future")
	public ResponseEntity<Integer> getCountFuture(@RequestParam String category) {
		int count = AdProServ.getCountFuture(category);
		System.out.println(count);
		System.out.println("카테고리"+category);
		return ResponseEntity.ok(count);
	}
	// Count - 종료 상품 갯수 
	@GetMapping("/count/past")
	public ResponseEntity<Integer> getCountPast(@RequestParam String category) {
		int count = AdProServ.getCountPast(category);
		System.out.println(count);
		System.out.println("카테고리"+category);
		return ResponseEntity.ok(count);
	}
	// 카테고리별로 현재 제품을 가져오기
	@GetMapping("/current")
	public ResponseEntity<List<HashMap<String, Object>>> getCurrentProductsByCategory(@RequestParam String category) {
		List<HashMap<String, Object>> products = AdProServ.getCurrentProductsByCategory(category);
		return ResponseEntity.ok(products);
	}
	// 카테고리별로 예정 제품을 가져오기
	@GetMapping("/future")
	public ResponseEntity<List<HashMap<String, Object>>> getFutureProductsByCategory(@RequestParam String category) {
		List<HashMap<String, Object>> products = AdProServ.getFutureProductsByCategory(category);
		return ResponseEntity.ok(products);
	}
	// 카테고리별로 과거 제품을 가져오기
	@GetMapping("/past")
	public ResponseEntity<List<HashMap<String, Object>>> getPastProductsByCategory(@RequestParam String category) {
		List<HashMap<String, Object>> products = AdProServ.getPastProductsByCategory(category);
		return ResponseEntity.ok(products);
	}
	// -------------------------------------
	// 할인 신청- 카테고리별 신청 대기 상품 갯수
	@GetMapping("/count/sale/waiting")
	public ResponseEntity<Integer> getCountSaleWaiting(@RequestParam String category) {
		int count = AdProServ.getCountSaleWaiting(category);
		return ResponseEntity.ok(count);
	}
	// 할인 신청 - 카테고리별 신청 결과 상품 갯수 - 최근 1달간. 
	@GetMapping("/count/sale/result")
	public ResponseEntity<Integer> getCountSaleResult(@RequestParam String category) {
		int count = AdProServ.getCountSaleResult(category);
		System.out.println(count);
		System.out.println("카테고리"+category);
		return ResponseEntity.ok(count);
	}
	// Sale = 할인 신청 대기 상품 리스트 - 카테고리 별로 
	@GetMapping("/sale/waiting")
	public ResponseEntity<List<HashMap<String, Object>>> getWaitingSaleByCategory(@RequestParam String category) {
		List<HashMap<String, Object>> products = AdProServ.getWaitingSaleByCategory(category);
		return ResponseEntity.ok(products);
	}
	// Sale = 할인 신청 결과 상품 리스트 - 카테고리 별로 , 최근 3개월분 
	@GetMapping("/sale/result")
	public ResponseEntity<List<HashMap<String, Object>>> getResultSaleByCategory(@RequestParam String category) {
		System.out.println(category);
		List<HashMap<String, Object>> products = AdProServ.getResultSaleByCategory(category);
		return ResponseEntity.ok(products);
	}
	// Sale = application_seq에 따른 상품 상세 정보 가져오기
    @GetMapping("/sale/apply")
    public ResponseEntity<List<HashMap<String, Object>>> getSaleDetail(@RequestParam String application_seq) {
        // 상품 상세 정보를 가져오는 서비스 메서드 호출
        return ResponseEntity.ok(AdProServ.getSaleDetail(application_seq));
    }
    // Sale = application_seq 상품 신청 승인처리 해주기 
    @PutMapping("/sale/apply/approve")
    public ResponseEntity<Integer> approveSale(@RequestBody Map<String, String> requestBody) {
        String applicationSeq = requestBody.get("application_seq");
        // 승인 처리 로직 (DB 업데이트 등)
        int result = AdProServ.approveSale(applicationSeq);
        return ResponseEntity.ok(result); // 성공 시 200 OK와 결과 반환
    }
	
	
	// ---------------------------------------
	// 신청- 카테고리별 신청 대기 상품 갯수
	@GetMapping("/count/waiting")
	public ResponseEntity<Integer> getCountProductsWaiting(@RequestParam String category) {
		int count = AdProServ.getCountProductsWaiting(category);
		return ResponseEntity.ok(count);
	}
	// 신청 - 카테고리별 신청 결과 상품 갯수 - 최근 1달간. 
	@GetMapping("/count/result")
	public ResponseEntity<Integer> getCountProductsResult(@RequestParam String category) {
		int count = AdProServ.getCountProductsResult(category);
		System.out.println(count);
		System.out.println("카테고리"+category);
		return ResponseEntity.ok(count);
	}
	// 신청 대기 상품 리스트 - 카테고리 별로 
	@GetMapping("/waiting")
	public ResponseEntity<List<HashMap<String, Object>>> getWaitingProductsByCategory(@RequestParam String category) {
		List<HashMap<String, Object>> products = AdProServ.getWaitingProductsByCategory(category);
		return ResponseEntity.ok(products);
	}
	// 신청 결과 상품 리스트 - 카테고리 별로 , 최근 3개월분 
	@GetMapping("/result")
	public ResponseEntity<List<HashMap<String, Object>>> getResultProductsByCategory(@RequestParam String category) {
		System.out.println(category);
		List<HashMap<String, Object>> products = AdProServ.getResultProductsByCategory(category);
		return ResponseEntity.ok(products);
	}
	
	// application_seq에 따른 상품 상세 정보 가져오기
    @GetMapping("/apply")
    public ResponseEntity<List<HashMap<String, Object>>> getProductsDetail(@RequestParam String application_seq) {
        // 상품 상세 정보를 가져오는 서비스 메서드 호출
        return ResponseEntity.ok(AdProServ.getProductDetails(application_seq));
    }
    // application_seq 상품 신청 승인처리 해주기 
    @PutMapping("/apply/approve")
    public ResponseEntity<Integer> approveProduct(@RequestBody Map<String, String> requestBody) {
        String applicationSeq = requestBody.get("application_seq");
        // 승인 처리 로직 (DB 업데이트 등)
        int result = AdProServ.approveProduct(applicationSeq);
        return ResponseEntity.ok(result); // 성공 시 200 OK와 결과 반환
    }
    // 신청 반려 처리 해주기 
    @PutMapping("/apply/reject")
    public ResponseEntity<Integer> rejectProduct(@RequestBody Map<String, String> requestBody) {
        String applicationSeq = requestBody.get("application_seq");
        String rejectReason = requestBody.get("reject_reason");
        
        // 반려 처리 로직 (DB 업데이트 등)
        int result = AdProServ.rejectProduct(applicationSeq, rejectReason);
        
        return ResponseEntity.ok(result); // 성공 시 200 OK와 결과 반환
    }
    
    // Sale 신청 반려 처리 해주기 
    @PutMapping("/sale/reject")
    public ResponseEntity<Integer> rejectSale(@RequestBody Map<String, String> requestBody) {
        String applicationSeq = requestBody.get("application_seq");
        String rejectReason = requestBody.get("reject_reason");
        
        // 반려 처리 로직 (DB 업데이트 등)
        int result = AdProServ.rejectSale(applicationSeq, rejectReason);
        
        return ResponseEntity.ok(result); // 성공 시 200 OK와 결과 반환
    }


}
