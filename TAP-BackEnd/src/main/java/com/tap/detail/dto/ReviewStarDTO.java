package com.tap.detail.dto;

import java.sql.Timestamp;

public class ReviewStarDTO {
	
	private int review_seq;
	private String member_id, review_title, review;
	private Timestamp review_date;
	private int stars, like_count;
	private String name, files_sysname;
	
	public ReviewStarDTO(int review_seq, String member_id, String review_title, String review, Timestamp review_date,
			int stars, int like_count, String name, String files_sysname) {
		super();
		this.review_seq = review_seq;
		this.member_id = member_id;
		this.review_title = review_title;
		this.review = review;
		this.review_date = review_date;
		this.stars = stars;
		this.like_count = like_count;
		this.name = name;
		this.files_sysname = files_sysname;
	}
	public ReviewStarDTO(int review_seq, String member_id, String review_title, String review, Timestamp review_date,
			int stars) {
		super();
		this.review_seq = review_seq;
		this.member_id = member_id;
		this.review_title = review_title;
		this.review = review;
		this.review_date = review_date;
		this.stars = stars;
	}
	public ReviewStarDTO() {
		super();
	}
	public int getReview_seq() {
		return review_seq;
	}
	public void setReview_seq(int review_seq) {
		this.review_seq = review_seq;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	public String getReview_title() {
		return review_title;
	}
	public void setReview_title(String review_title) {
		this.review_title = review_title;
	}
	public String getReview() {
		return review;
	}
	public void setReview(String review) {
		this.review = review;
	}
	public Timestamp getReview_date() {
		return review_date;
	}
	public void setReview_date(Timestamp review_date) {
		this.review_date = review_date;
	}
	public int getStars() {
		return stars;
	}
	public void setStars(int stars) {
		this.stars = stars;
	}
	public int getLike_count() {
		return like_count;
	}
	public void setLike_count(int like_count) {
		this.like_count = like_count;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getFiles_sysname() {
		return files_sysname;
	}
	public void setFiles_sysname(String files_sysname) {
		this.files_sysname = files_sysname;
	}
	
	
	
}
