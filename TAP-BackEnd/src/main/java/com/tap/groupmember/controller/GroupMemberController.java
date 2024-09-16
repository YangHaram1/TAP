package com.tap.groupmember.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tap.groupmember.dto.GroupMemberDTO;
import com.tap.groupmember.service.GroupMemberSerivce;
import com.tap.members.service.MembersService;

@RestController
@RequestMapping("/groupmember")
public class GroupMemberController {

	@Autowired
	private GroupMemberSerivce serv;

	@Autowired
	private MembersService mserv;

	@GetMapping
	public ResponseEntity<List<GroupMemberDTO>> get(int groupSeq) throws Exception {

		return ResponseEntity.ok(serv.membersByGroupSeq(groupSeq));
	}

	@PatchMapping
	public ResponseEntity<Void> patch(int group_seq, @RequestParam(defaultValue = "0") int last_chat_seq,
			String type, Principal principal) throws Exception {

		if (principal == null) {
			return ResponseEntity.ok(null);
		}
		String username = principal.getName();
		UserDetails user = mserv.loadUserByUsername(username);
		String loginID = user.getUsername();

		if (last_chat_seq != 0) {
			serv.updateCheck(group_seq, loginID, last_chat_seq);
			System.out.println(last_chat_seq);
		} else if (type.equals("alarm")) {
			serv.updateAlarm(group_seq, loginID);
		} else if (type.equals("bookmark")) {
			serv.updateBookmark(group_seq, loginID);
		}
		return ResponseEntity.ok().build();

	}
	
	@DeleteMapping
	public ResponseEntity<Void> delete(int groupSeq) throws Exception{
		
		//그룹seq 다날리면됌
		return ResponseEntity.ok().build();
	}

}
