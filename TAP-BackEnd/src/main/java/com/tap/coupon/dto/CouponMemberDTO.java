package com.tap.coupon.dto;

import java.sql.Timestamp;

public class CouponMemberDTO {
	private int seq;
	private int type_seq;
	private String member_id;
	private Timestamp issue_date;
	private Timestamp expire_date;
	private int state;
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
	public int getType_seq() {
		return type_seq;
	}
	public void setType_seq(int type_seq) {
		this.type_seq = type_seq;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	public Timestamp getIssue_date() {
		return issue_date;
	}
	public void setIssue_date(Timestamp issue_date) {
		this.issue_date = issue_date;
	}
	public Timestamp getExpire_date() {
		return expire_date;
	}
	public void setExpire_date(Timestamp expire_date) {
		this.expire_date = expire_date;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
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
	public CouponMemberDTO(int seq, int type_seq, String member_id, Timestamp issue_date, Timestamp expire_date,
			int state, String title, String contents, int discount, int coupon_order) {
		super();
		this.seq = seq;
		this.type_seq = type_seq;
		this.member_id = member_id;
		this.issue_date = issue_date;
		this.expire_date = expire_date;
		this.state = state;
		this.title = title;
		this.contents = contents;
		this.discount = discount;
		this.coupon_order = coupon_order;
	}
	public CouponMemberDTO() {
		super();
	}
	
	
}
