package com.tap.members.dto;

import java.sql.Timestamp;

public class MembersGradeDTO {

	private String pw;
	private String name;
	private String grade;
	private String role;
	public String getPw() {
		return pw;
	}
	public void setPw(String pw) {
		this.pw = pw;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGrade() {
		return grade;
	}
	public void setGrade(String grade) {
		this.grade = grade;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public MembersGradeDTO(String pw, String name, String grade, String role) {
		super();
		this.pw = pw;
		this.name = name;
		this.grade = grade;
		this.role = role;
	}
	public MembersGradeDTO() {
		super();
	}
	
	
}
