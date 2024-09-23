package com.tap.detail.dto;

import java.sql.Timestamp;

public class ExciteDTO {
	
	private int excite_seq, application_seq;
	private String member_id, excite_title, excite;
	private Timestamp excite_date;
	public ExciteDTO(int excite_seq, int application_seq, String member_id, String excite_title, String excite,
			Timestamp excite_date) {
		super();
		this.excite_seq = excite_seq;
		this.application_seq = application_seq;
		this.member_id = member_id;
		this.excite_title = excite_title;
		this.excite = excite;
		this.excite_date = excite_date;
	}
	public ExciteDTO() {
		super();
	}
	public int getExcite_seq() {
		return excite_seq;
	}
	public void setExcite_seq(int excite_seq) {
		this.excite_seq = excite_seq;
	}
	public int getApplication_seq() {
		return application_seq;
	}
	public void setApplication_seq(int application_seq) {
		this.application_seq = application_seq;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	public String getExcite_title() {
		return excite_title;
	}
	public void setExcite_title(String excite_title) {
		this.excite_title = excite_title;
	}
	public String getExcite() {
		return excite;
	}
	public void setExcite(String excite) {
		this.excite = excite;
	}
	public Timestamp getExcite_date() {
		return excite_date;
	}
	public void setExcite_date(Timestamp excite_date) {
		this.excite_date = excite_date;
	}
	
	

}
