package com.tap.biz.dto;

import java.sql.Timestamp;

public class CastingDataDTO {
	private int casting_seq=0;
	private int application_seq=0;
	private int schedule_day;
	private String schedule_time;
	private String casting_name;
	private String casting_role;
	private String file_oriname;
	private String file_sysname;
	public int getCasting_seq() {
		return casting_seq;
	}
	public void setCasting_seq(int casting_seq) {
		this.casting_seq = casting_seq;
	}
	public int getApplication_seq() {
		return application_seq;
	}
	public void setApplication_seq(int application_seq) {
		this.application_seq = application_seq;
	}
	public int getSchedule_day() {
		return schedule_day;
	}
	public void setSchedule_day(int schedule_day) {
		this.schedule_day = schedule_day;
	}
	public String getSchedule_time() {
		return schedule_time;
	}
	public void setSchedule_time(String schedule_time) {
		this.schedule_time = schedule_time;
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
	public String getFile_oriname() {
		return file_oriname;
	}
	public void setFile_oriname(String file_oriname) {
		this.file_oriname = file_oriname;
	}
	public String getFile_sysname() {
		return file_sysname;
	}
	public void setFile_sysname(String file_sysname) {
		this.file_sysname = file_sysname;
	}
	public CastingDataDTO(int casting_seq, int application_seq, int schedule_day, String schedule_time,
			String casting_name, String casting_role, String file_oriname, String file_sysname) {
		super();
		this.casting_seq = casting_seq;
		this.application_seq = application_seq;
		this.schedule_day = schedule_day;
		this.schedule_time = schedule_time;
		this.casting_name = casting_name;
		this.casting_role = casting_role;
		this.file_oriname = file_oriname;
		this.file_sysname = file_sysname;
	}
	public CastingDataDTO() {
		super();
	}
	
	
	
	
}
