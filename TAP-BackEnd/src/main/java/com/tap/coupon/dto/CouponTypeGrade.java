package com.tap.coupon.dto;

public class CouponTypeGrade {
	private int seq;
	private String title;
	private String contents;
	private int discount;
	private String name;
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public int getDiscount() {
		return discount;
	}
	public void setDiscount(int discount) {
		this.discount = discount;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public CouponTypeGrade(int seq, String title, String contents, int discount, String name) {
		super();
		this.seq = seq;
		this.title = title;
		this.contents = contents;
		this.discount = discount;
		this.name = name;
	}
	public CouponTypeGrade() {
		super();
	}
	
	
	
}
