package com.tap.members.dto;

import java.sql.Timestamp;

public class MembersDTO {
	private String id;
	private String pw;
	private String name;
	private String phone;
	private String email;
	private String birth;
	private String gender;
	private int delivery_seq;
	private int grade_seq;
	private Timestamp join_date;
	private int enabled;
	private String role;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
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
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getBirth() {
		return birth;
	}
	public void setBirth(String birth) {
		this.birth = birth;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public int getDelivery_seq() {
		return delivery_seq;
	}
	public void setDelivery_seq(int delivery_seq) {
		this.delivery_seq = delivery_seq;
	}
	public int getGrade_seq() {
		return grade_seq;
	}
	public void setGrade_seq(int grade_seq) {
		this.grade_seq = grade_seq;
	}
	public Timestamp getJoin_date() {
		return join_date;
	}
	public void setJoin_date(Timestamp join_date) {
		this.join_date = join_date;
	}
	public int getEnabled() {
		return enabled;
	}
	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public MembersDTO(String id, String pw, String name, String phone, String email, String birth, String gender,
			int delivery_seq, int grade_seq, Timestamp join_date, int enabled, String role) {
		super();
		this.id = id;
		this.pw = pw;
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.birth = birth;
		this.gender = gender;
		this.delivery_seq = delivery_seq;
		this.grade_seq = grade_seq;
		this.join_date = join_date;
		this.enabled = enabled;
		this.role = role;
	}
	public MembersDTO() {
		super();
	}
	
	
	
	
	
	
}
