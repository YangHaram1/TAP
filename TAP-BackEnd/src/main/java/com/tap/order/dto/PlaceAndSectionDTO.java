package com.tap.order.dto;

public class PlaceAndSectionDTO {
	
	private int place_total_seats;
	private String place_shape;
	private int section_seq;
	private String section_name;
	private int selection_col, selection_row;
	
	public PlaceAndSectionDTO(int place_total_seats, String place_shape, int section_seq, String section_name,
			int selection_col, int selection_row) {
		super();
		this.place_total_seats = place_total_seats;
		this.place_shape = place_shape;
		this.section_seq = section_seq;
		this.section_name = section_name;
		this.selection_col = selection_col;
		this.selection_row = selection_row;
	}
	public PlaceAndSectionDTO() {
		super();
	}
	public int getPlace_total_seats() {
		return place_total_seats;
	}
	public void setPlace_total_seats(int place_total_seats) {
		this.place_total_seats = place_total_seats;
	}
	public String getPlace_shape() {
		return place_shape;
	}
	public void setPlace_shape(String place_shape) {
		this.place_shape = place_shape;
	}
	public int getSection_seq() {
		return section_seq;
	}
	public void setSection_seq(int section_seq) {
		this.section_seq = section_seq;
	}
	public String getSection_name() {
		return section_name;
	}
	public void setSection_name(String section_name) {
		this.section_name = section_name;
	}
	public int getSelection_col() {
		return selection_col;
	}
	public void setSelection_col(int selection_col) {
		this.selection_col = selection_col;
	}
	public int getSelection_row() {
		return selection_row;
	}
	public void setSelection_row(int selection_row) {
		this.selection_row = selection_row;
	}
	
	

}
