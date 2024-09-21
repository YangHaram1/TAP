package com.tap.order.dto;

public class BookDTO {

	private String book_seq;
	private int order_seq;
	private String member_id, book_date, book_time;
	private int section_seq,book_row, book_col;
	private String book_level;
	public BookDTO(String book_seq, int order_seq, String member_id, String book_date, String book_time,
			int section_seq, int book_row, int book_col, String book_level) {
		super();
		this.book_seq = book_seq;
		this.order_seq = order_seq;
		this.member_id = member_id;
		this.book_date = book_date;
		this.book_time = book_time;
		this.section_seq = section_seq;
		this.book_row = book_row;
		this.book_col = book_col;
		this.book_level = book_level;
	}
	public BookDTO() {
		super();
	}
	public String getBook_seq() {
		return book_seq;
	}
	public void setBook_seq(String book_seq) {
		this.book_seq = book_seq;
	}
	public int getOrder_seq() {
		return order_seq;
	}
	public void setOrder_seq(int order_seq) {
		this.order_seq = order_seq;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	public String getBook_date() {
		return book_date;
	}
	public void setBook_date(String book_date) {
		this.book_date = book_date;
	}
	public String getBook_time() {
		return book_time;
	}
	public void setBook_time(String book_time) {
		this.book_time = book_time;
	}
	public int getSection_seq() {
		return section_seq;
	}
	public void setSection_seq(int section_seq) {
		this.section_seq = section_seq;
	}
	public int getBook_row() {
		return book_row;
	}
	public void setBook_row(int book_row) {
		this.book_row = book_row;
	}
	public int getBook_col() {
		return book_col;
	}
	public void setBook_col(int book_col) {
		this.book_col = book_col;
	}
	public String getBook_level() {
		return book_level;
	}
	public void setBook_level(String book_level) {
		this.book_level = book_level;
	}
	
	
}
