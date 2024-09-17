package com.tap.inquiry.dto;

import java.sql.Timestamp;

public class InquiryDTO {
	private int seq;
	private String member_id;
	private String name;
	private String email;
	private String category;
	private String title;
	private String contents;
	private Timestamp write_data;
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public Timestamp getWrite_data() {
		return write_data;
	}
	public void setWrite_data(Timestamp write_data) {
		this.write_data = write_data;
	}
	public InquiryDTO(int seq, String member_id, String name, String email, String category, String title,
			String contents, Timestamp write_data) {
		super();
		this.seq = seq;
		this.member_id = member_id;
		this.name = name;
		this.email = email;
		this.category = category;
		this.title = title;
		this.contents = contents;
		this.write_data = write_data;
	}
	public InquiryDTO() {
		super();
	}
	
	
}
