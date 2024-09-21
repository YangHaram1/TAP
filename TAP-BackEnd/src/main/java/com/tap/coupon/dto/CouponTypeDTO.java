package com.tap.coupon.dto;

public class CouponTypeDTO {
	
	private int seq;
	private String title;
	private String contents;
	private int discount;
	private int coupon_order;
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
	public int getCoupon_order() {
		return coupon_order;
	}
	public void setCoupon_order(int coupon_order) {
		this.coupon_order = coupon_order;
	}
	public CouponTypeDTO(int seq, String title, String contents, int discount, int coupon_order) {
		super();
		this.seq = seq;
		this.title = title;
		this.contents = contents;
		this.discount = discount;
		this.coupon_order = coupon_order;
	}
	public CouponTypeDTO() {
		super();
	}
	
	
}
