package com.tap.biz.dto;

public class TestClobDTO {
	private int description_seq;
	private int application_seq;
	private String description_content;
	public int getDescription_seq() {
		return description_seq;
	}
	public void setDescription_seq(int description_seq) {
		this.description_seq = description_seq;
	}
	public int getApplication_seq() {
		return application_seq;
	}
	public void setApplication_seq(int application_seq) {
		this.application_seq = application_seq;
	}
	public String getDescription_content() {
		return description_content;
	}
	public void setDescription_content(String description_content) {
		this.description_content = description_content;
	}
	public TestClobDTO(int description_seq, int application_seq, String description_content) {
		super();
		this.description_seq = description_seq;
		this.application_seq = application_seq;
		this.description_content = description_content;
	}
	public TestClobDTO() {
		super();
	}
	
}
