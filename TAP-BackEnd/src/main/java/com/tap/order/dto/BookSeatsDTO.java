package com.tap.order.dto;

public class BookSeatsDTO {
	
	private int section_seq, book_row, book_col;
	private String book_level;
	public BookSeatsDTO(int section_seq, int book_row, int book_col, String book_level) {
		super();
		this.section_seq = section_seq;
		this.book_row = book_row;
		this.book_col = book_col;
		this.book_level = book_level;
	}
	public BookSeatsDTO() {
		super();
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
