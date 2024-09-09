package com.tap.groupmember.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.tap.groupmember.dto.GroupMemberDTO;

@Service
public class GroupMemberSerivce {

	
	public List<GroupMemberDTO> members(int groupSeq){
		List<GroupMemberDTO> list=new ArrayList<>();
		return list;
	}
}
