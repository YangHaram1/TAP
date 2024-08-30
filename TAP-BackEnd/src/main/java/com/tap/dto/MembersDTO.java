package com.tap.dto;

public class MembersDTO {
	private String id;
	private String pw;
	private String name;
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
	public MembersDTO(String id, String pw, String name, int enabled, String role) {
		super();
		this.id = id;
		this.pw = pw;
		this.name = name;
		this.enabled = enabled;
		this.role = role;
	}
	public MembersDTO() {
		super();
	}
	
	
	
	
}
