package com.tap.delivery.dto;

public class DeliveryDTO {
	private int seq;
	private String member_id;
	private String address;
	private String detailed_address;
	private String zipcode;
	private String name;
	private String phone;
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
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
	public DeliveryDTO(int seq, String member_id, String address, String detailed_address, String zipcode, String name,
			String phone) {
		super();
		this.seq = seq;
		this.member_id = member_id;
		this.address = address;
		this.detailed_address = detailed_address;
		this.zipcode = zipcode;
		this.name = name;
		this.phone = phone;
	}
	public DeliveryDTO() {
		super();
	}
	
	
	 
	
}
