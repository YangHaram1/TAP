package com.tap.groupchat.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.groupchat.dto.GroupChatDTO;
import com.tap.groupchat.dto.GroupChatMemberDTO;
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
	public ResponseEntity<Integer> insert(Principal principal) throws Exception {
		
		if (principal == null) {
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		UserDetails user = mserv.loadUserByUsername(username);
		
		int seq=gmserv.checkById(user.getUsername());
		System.out.println(seq);
		if(seq==0) {
			seq=gserv.insert(user.getUsername());
			return ResponseEntity.ok(seq);
		}else {
			return ResponseEntity.ok(seq);
		}
		
	}
	
	@GetMapping
	public ResponseEntity<List<GroupChatMemberDTO>> get(Principal principal) throws Exception{
		if (principal == null) {
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		UserDetails user = mserv.loadUserByUsername(username);
		List<GroupChatMemberDTO> result =gserv.getGroupChatMemberDTO(user.getUsername());
		return ResponseEntity.ok(result);
	}

} 
