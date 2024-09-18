package com.tap.reply.dto;

import java.sql.Timestamp;

public class ReplyDTO {
	private int seq;
	private String member_id;
	private String contents;
	private int parent_seq;
	private Timestamp write_date;
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public int getParent_seq() {
		return parent_seq;
	}
	public void setParent_seq(int parent_seq) {
		this.parent_seq = parent_seq;
	}
	public Timestamp getWrite_date() {
		return write_date;
	}
	public void setWrite_date(Timestamp write_date) {
		this.write_date = write_date;
	}
	public ReplyDTO(int seq, String member_id, String contents, int parent_seq, Timestamp write_date) {
		super();
		this.seq = seq;
		this.member_id = member_id;
		this.contents = contents;
		this.parent_seq = parent_seq;
		this.write_date = write_date;
	}
	public ReplyDTO() {
		super();
	}
	
	
}
