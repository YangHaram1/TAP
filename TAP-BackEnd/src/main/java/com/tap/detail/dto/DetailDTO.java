package com.tap.detail.dto;

import java.sql.Timestamp;

public class DetailDTO {
	
	private String name, place_name, id;
	private Timestamp start_date, end_date, open_date;
	private int running_time, running_intertime, sub_category_seq;
	private String status, age_limit, files_sysname;
	private int max_ticket, place_seq;
	
	public DetailDTO(String name, String place_name, String id,Timestamp start_date, Timestamp end_date, Timestamp open_date,
			int running_time, int running_intertime, int sub_category_seq,String status, String age_limit, String files_sysname,
			int max_ticket, int place_seq) {
		super();
		this.name = name;
		this.place_name = place_name;
		this.id = id;
		this.start_date = start_date;
		this.end_date = end_date;
		this.open_date = open_date;
		this.running_time = running_time;
		this.running_intertime = running_intertime;
		this.sub_category_seq = sub_category_seq;
		this.status = status;
		this.age_limit = age_limit;
		this.files_sysname = files_sysname;
		this.max_ticket = max_ticket;
		this.place_seq = place_seq;
	}

	public DetailDTO() {
		super();
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPlace_name() {
		return place_name;
	}
	public void setPlace_name(String place_name) {
		this.place_name = place_name;
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
	public int getRunning_time() {
		return running_time;
	}
	public void setRunning_time(int running_time) {
		this.running_time = running_time;
	}
	public int getRunning_intertime() {
		return running_intertime;
	}
	public void setRunning_intertime(int running_intertime) {
		this.running_intertime = running_intertime;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getAge_limit() {
		return age_limit;
	}
	public void setAge_limit(String age_limit) {
		this.age_limit = age_limit;
	}
	public String getFiles_sysname() {
		return files_sysname;
	}
	public void setFiles_sysname(String files_sysname) {
		this.files_sysname = files_sysname;
	}
	public int getMax_ticket() {
		return max_ticket;
	}
	public void setMax_ticket(int max_ticket) {
		this.max_ticket = max_ticket;
	}
	public int getPlace_seq() {
		return place_seq;
	}
	public void setPlace_seq(int place_seq) {
		this.place_seq = place_seq;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getSub_category_seq() {
		return sub_category_seq;
	}
	public void setSub_category_seq(int sub_category_seq) {
		this.sub_category_seq = sub_category_seq;
	}
	

}
