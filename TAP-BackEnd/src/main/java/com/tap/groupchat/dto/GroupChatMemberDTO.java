package com.tap.groupchat.dto;

import com.tap.chat.dto.ChatDTO;
import com.tap.members.dto.MembersDTO;

public class GroupChatMemberDTO {
	private int seq;
	private String alarm;
	private String bookmark;
	private int unread;
	private ChatDTO dto;
	private MembersDTO mdto;
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getAlarm() {
		return alarm;
	}
	public void setAlarm(String alarm) {
		this.alarm = alarm;
	}
	public String getBookmark() {
		return bookmark;
	}
	public void setBookmark(String bookmark) {
		this.bookmark = bookmark;
	}
	public int getUnread() {
		return unread;
	}
	public void setUnread(int unread) {
		this.unread = unread;
	}
	public ChatDTO getDto() {
		return dto;
	}
	public void setDto(ChatDTO dto) {
		this.dto = dto;
	}
	public MembersDTO getMdto() {
		return mdto;
	}
	public void setMdto(MembersDTO mdto) {
		this.mdto = mdto;
	}
	public GroupChatMemberDTO(int seq, String alarm, String bookmark, int unread, ChatDTO dto, MembersDTO mdto) {
		super();
		this.seq = seq;
		this.alarm = alarm;
		this.bookmark = bookmark;
		this.unread = unread;
		this.dto = dto;
		this.mdto = mdto;
	}
	public GroupChatMemberDTO() {
		super();
	}
	
	
	
	
}
