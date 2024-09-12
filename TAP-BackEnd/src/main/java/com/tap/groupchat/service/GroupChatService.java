package com.tap.groupchat.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.chat.dao.ChatDAO;
import com.tap.chat.dto.ChatDTO;
import com.tap.groupchat.dao.GroupChatDAO;
import com.tap.groupchat.dto.GroupChatDTO;
import com.tap.groupchat.dto.GroupChatMemberDTO;
import com.tap.groupmember.dao.GroupMemberDAO;
import com.tap.groupmember.dto.GroupMemberDTO;
import com.tap.members.dao.MembersDAO;
import com.tap.members.dto.MembersDTO;

import jakarta.transaction.Transactional;

@Service
public class GroupChatService {

	@Autowired
	private GroupChatDAO dao;

	@Autowired
	private GroupMemberDAO gmdao;

	@Autowired
	private MembersDAO mdao;

	@Autowired
	private ChatDAO cdao;

	@Transactional
	public int insert(String id) throws Exception {
		int seq = dao.insert();
		gmdao.insert(seq, id);
		List<String> list = mdao.selectByAdmin();
		gmdao.insertAdmin(seq, list);
		return seq;
	}

	public List<GroupChatMemberDTO> getGroupChatMemberDTO(String adminName) throws Exception {
		List<GroupChatMemberDTO> result = new ArrayList<>();
		List<GroupMemberDTO> list = gmdao.list(adminName);// 그관리자가가 가지고있는 방 list

		MembersDTO userDTO = new MembersDTO();
		for (GroupMemberDTO dto : list) {
			String memberId = gmdao.memberId(dto.getGroup_seq()); // 방에 있는 유저 아이디 가저오기 1개고정
			int lastChatSeq = dto.getLast_chat_seq();
			MembersDTO mdto = mdao.selectById(memberId); //그 유저 아이디에 정보
			if (mdto != null) {
				mdto.setPw("");
			}
			ChatDTO cdto = cdao.getLastDTO(dto.getGroup_seq()); // 그룹채팅방에서 마지막 메세지 가저오는거고
			int unread = 0;
			if (cdto != null) {
				unread = cdao.unread(dto.getGroup_seq(), lastChatSeq, cdto.getSeq()) - 1;//안읽은 메세지 로직
			}
			result.add(
				new GroupChatMemberDTO(dto.getGroup_seq(), dto.getAlarm(), dto.getBookmark(), unread, cdto,mdto));
			
		}

		if (list != null)
			return result;

		return null;
	}
}
