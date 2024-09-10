package com.tap.biz.dto;

import java.sql.Timestamp;

public class TotalScheduleDTO {
	private int schedule_seq;
	private int application_seq;
	private String schedule_day;
	private String schedule_time;
	
	
	public TotalScheduleDTO(int schedule_seq, int application_seq, String schedule_day, String schedule_time) {
		super();
		this.schedule_seq = schedule_seq;
		this.application_seq = application_seq;
		this.schedule_day = schedule_day;
		this.schedule_time = schedule_time;
	}


	public int getSchedule_seq() {
		return schedule_seq;
	}


	public void setSchedule_seq(int schedule_seq) {
		this.schedule_seq = schedule_seq;
	}


	public int getApplication_seq() {
		return application_seq;
	}


	public void setApplication_seq(int application_seq) {
		this.application_seq = application_seq;
	}


	public String getSchedule_day() {
		return schedule_day;
	}


	public void setSchedule_day(String schedule_day) {
		this.schedule_day = schedule_day;
	}


	public String getSchedule_time() {
		return schedule_time;
	}


	public void setSchedule_time(String schedule_time) {
		this.schedule_time = schedule_time;
	}


	public TotalScheduleDTO() {
		super();
	}
	
	
}
