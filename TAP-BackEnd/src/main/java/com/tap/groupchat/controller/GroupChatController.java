package com.tap.groupchat.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.delivery.dto.DeliveryDTO;
import com.tap.groupchat.service.GroupChatService;
import com.tap.groupmember.service.GroupMemberSerivce;
import com.tap.members.service.MembersService;

@RestController
@RequestMapping("/groupchat")
public class GroupChatController {
	
	@Autowired
	private GroupChatService gserv;
	@Autowired
	private GroupMemberSerivce gmserv;
	@Autowired
	private MembersService mserv;
	
	@PostMapping()
	public ResponseEntity<String> insert(Principal principal) throws Exception {
		
		if (principal == null) {
			System.out.println("principal");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");

		}
		String username = principal.getName();
		UserDetails user = mserv.loadUserByUsername(username);
		
		boolean check=gmserv.checkById(user.getUsername());
		if(!check) {
			int seq=gserv.insert();
			gmserv.insert(seq, user.getUsername());
			
		}else {
			
		}
		return ResponseEntity.ok(null);
		
		
	}

} 
