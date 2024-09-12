package com.tap.company.dto;

import com.google.cloud.Timestamp;

public class CompanyDTO {
	private String member_id;
	private String address;
	private String detailed_address;
	private String name;
	private String phone;
	private String registration_number;
	private String zipcode;
	private Timestamp issue_date;
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getDetailed_address() {
		return detailed_address;
	}
	public void setDetailed_address(String detailed_address) {
		this.detailed_address = detailed_address;
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
	public String getRegistration_number() {
		return registration_number;
	}
	public void setRegistration_number(String registration_number) {
		this.registration_number = registration_number;
	}
	public String getZipcode() {
		return zipcode;
	}
	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}
	public Timestamp getIssue_date() {
		return issue_date;
	}
	public void setIssue_date(Timestamp issue_date) {
		this.issue_date = issue_date;
	}
	public CompanyDTO(String member_id, String address, String detailed_address, String name, String phone,
			String registration_number, String zipcode, Timestamp issue_date) {
		super();
		this.member_id = member_id;
		this.address = address;
		this.detailed_address = detailed_address;
		this.name = name;
		this.phone = phone;
		this.registration_number = registration_number;
		this.zipcode = zipcode;
		this.issue_date = issue_date;
	}
	public CompanyDTO() {
		super();
	}
	
	
	
}
