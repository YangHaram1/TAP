package com.tap.detail.dto;

import java.sql.Timestamp;

public class ScheduleAndCastingDTO {
	
	private Timestamp schedule_day, schedule_time;
	private String days;
	private int day_number;
	private String times, casting_name, casting_role, file_sysname;
	public ScheduleAndCastingDTO(Timestamp schedule_day, Timestamp schedule_time, String days, int day_number,
			String times, String casting_name, String casting_role, String file_sysname) {
		super();
		this.schedule_day = schedule_day;
		this.schedule_time = schedule_time;
		this.days = days;
		this.day_number = day_number;
		this.times = times;
		this.casting_name = casting_name;
		this.casting_role = casting_role;
		this.file_sysname = file_sysname;
	}
	public ScheduleAndCastingDTO() {
		super();
	}
	public Timestamp getSchedule_day() {
		return schedule_day;
	}
	public void setSchedule_day(Timestamp schedule_day) {
		this.schedule_day = schedule_day;
	}
	public Timestamp getSchedule_time() {
		return schedule_time;
	}
	public void setSchedule_time(Timestamp schedule_time) {
		this.schedule_time = schedule_time;
	}
	public String getDays() {
		return days;
	}
	public void setDays(String days) {
		this.days = days;
	}
	public int getDay_number() {
		return day_number;
	}
	public void setDay_number(int day_number) {
		this.day_number = day_number;
	}
	public String getTimes() {
		return times;
	}
	public void setTimes(String times) {
		this.times = times;
	}
	public String getCasting_name() {
		return casting_name;
	}
	public void setCasting_name(String casting_name) {
		this.casting_name = casting_name;
	}
	public String getCasting_role() {
		return casting_role;
	}
	public void setCasting_role(String casting_role) {
		this.casting_role = casting_role;
	}
	public String getFile_sysname() {
		return file_sysname;
	}
	public void setFile_sysname(String file_sysname) {
		this.file_sysname = file_sysname;
	}
	
	

}
