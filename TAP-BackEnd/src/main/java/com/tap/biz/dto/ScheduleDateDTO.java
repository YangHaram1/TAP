package com.tap.biz.dto;

import java.sql.Timestamp;

public class ScheduleDateDTO {
	private int schedule_seq;
	private int application_seq;
	private Timestamp schedule_date;
	
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
	
	public Timestamp getSchedule_date() {
		return schedule_date;
	}
	public void setSchedule_date(Timestamp schedule_date) {
		this.schedule_date = schedule_date;
	}
	public ScheduleDateDTO() {
		super();
	}
	public ScheduleDateDTO(int schedule_seq, int application_seq, Timestamp schedule_date) {
		super();
		this.schedule_seq = schedule_seq;
		this.application_seq = application_seq;
		this.schedule_date = schedule_date;
	}
	
	
}
