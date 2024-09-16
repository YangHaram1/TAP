package com.tap.delivery.controller;

import java.lang.reflect.Type;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.tap.delivery.dto.DeliveryDTO;
import com.tap.delivery.service.deliveryService;

@RestController
@RequestMapping("/delivery")
public class deliveryController {
	
	@Autowired
	private deliveryService dserv;
	
	@PostMapping()
	public ResponseEntity<String> insert(@RequestBody DeliveryDTO dto,Principal principal) throws Exception {
		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		dto.setMember_id(username);
		dserv.insert(dto);
		return ResponseEntity.ok(String.valueOf(dto.getSeq()));
	}
	
	@GetMapping 
	ResponseEntity<List<DeliveryDTO>> get(Principal principal) throws Exception {
		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		List<DeliveryDTO> list =dserv.selectById(username);
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/default")
	ResponseEntity<DeliveryDTO> getBySeq(Principal principal) throws Exception { //delivery_seq 이용
		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		DeliveryDTO dto =dserv.selectBySeq(username);
		return ResponseEntity.ok(dto);
	}
	
	
	
	@DeleteMapping()
	ResponseEntity<String> deleteByArray(@RequestBody String data) throws Exception{
		System.out.println(data);
		Gson gson =new Gson();
		Type type = new TypeToken<ArrayList<Integer>>(){}.getType();
		List<Integer> result= gson.fromJson(data, type);
		dserv.deleteByArray(result);
		
		return ResponseEntity.ok(null);
	}
	
}
