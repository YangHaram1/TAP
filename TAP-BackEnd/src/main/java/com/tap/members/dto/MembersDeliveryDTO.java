package com.tap.members.dto;

public class MembersDeliveryDTO {
	//members만 있는 colume
	private String id;
	private String pw;
	private String name;
	private String phone;
	private String email;
	private String birth;
	private String gender;
	private int delivery_seq;
	//delivery + company 공통 
	private String member_id;
	private String address;
	private String detailed_address;
	private String zipcode;
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
	public String getZipcode() {
		return zipcode;
	}
	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}
	public MembersDeliveryDTO(String id, String pw, String name, String phone, String email, String birth,
			String gender, int delivery_seq, String member_id, String address, String detailed_address,
			String zipcode) {
		super();
		this.id = id;
		this.pw = pw;
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.birth = birth;
		this.gender = gender;
		this.delivery_seq = delivery_seq;
		this.member_id = member_id;
		this.address = address;
		this.detailed_address = detailed_address;
		this.zipcode = zipcode;
	}
	public MembersDeliveryDTO() {
		super();
	}
	
	

	
	
	
	
}
