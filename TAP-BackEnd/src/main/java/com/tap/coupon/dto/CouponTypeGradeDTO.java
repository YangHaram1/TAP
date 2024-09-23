package com.tap.coupon.dto;

public class CouponTypeGradeDTO {
	private int seq;
	private String title;
	private String contents;
	private int discount;
	private String name;
	private int min_point;
	private int benefits;
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getMin_point() {
		return min_point;
	}
	public void setMin_point(int min_point) {
		this.min_point = min_point;
	}
	public int getBenefits() {
		return benefits;
	}
	public void setBenefits(int benefits) {
		this.benefits = benefits;
	}
	public int getCoupon_order() {
		return coupon_order;
	}
	public void setCoupon_order(int coupon_order) {
		this.coupon_order = coupon_order;
	}
	public CouponTypeGradeDTO(int seq, String title, String contents, int discount, String name, int min_point,
			int benefits, int coupon_order) {
		super();
		this.seq = seq;
		this.title = title;
		this.contents = contents;
		this.discount = discount;
		this.name = name;
		this.min_point = min_point;
		this.benefits = benefits;
		this.coupon_order = coupon_order;
	}
	public CouponTypeGradeDTO() {
		super();
	}

	
	
	
	
	
}
