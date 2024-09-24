package com.tap.search.dto;

import java.sql.Timestamp;

public class SearchResultDTO {
	private int application_seq;
	private String name;
	private Timestamp start_date, end_date, open_date;
	private String status, place_name, sub_category_name, files_sysname;
	public int getApplication_seq() {
		return application_seq;
	}
	public void setApplication_seq(int application_seq) {
		this.application_seq = application_seq;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Timestamp getStart_date() {
		return start_date;
	}
	public void setStart_date(Timestamp start_date) {
		this.start_date = start_date;
	}
	public Timestamp getEnd_date() {
		return end_date;
	}
	public void setEnd_date(Timestamp end_date) {
		this.end_date = end_date;
	}
	public Timestamp getOpen_date() {
		return open_date;
	}
	public void setOpen_date(Timestamp open_date) {
		this.open_date = open_date;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getPlace_name() {
		return place_name;
	}
	public void setPlace_name(String place_name) {
		this.place_name = place_name;
	}
	public String getSub_category_name() {
		return sub_category_name;
	}
	public void setSub_category_name(String sub_category_name) {
		this.sub_category_name = sub_category_name;
	}
	public String getFiles_sysname() {
		return files_sysname;
	}
	public void setFiles_sysname(String files_sysname) {
		this.files_sysname = files_sysname;
	}
	public SearchResultDTO(int application_seq, String name, Timestamp start_date, Timestamp end_date,
			Timestamp open_date, String status, String place_name, String sub_category_name, String files_sysname) {
		super();
		this.application_seq = application_seq;
		this.name = name;
		this.start_date = start_date;
		this.end_date = end_date;
		this.open_date = open_date;
		this.status = status;
		this.place_name = place_name;
		this.sub_category_name = sub_category_name;
		this.files_sysname = files_sysname;
	}
	public SearchResultDTO() {
		super();
	}
	
	
	
}
