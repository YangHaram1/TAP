package com.tap.groupmember.dto;

public class GroupMemberDTO {
	private int group_seq;
	private String member_id;
	public int getGroup_seq() {
		return group_seq;
	}
	public void setGroup_seq(int group_seq) {
		this.group_seq = group_seq;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	public GroupMemberDTO(int group_seq, String member_id) {
		super();
		this.group_seq = group_seq;
		this.member_id = member_id;
	}
	public GroupMemberDTO() {
		super();
	}
	
	
}
