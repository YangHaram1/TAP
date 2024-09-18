package com.tap.detail.dto;

public class SeatsDTO {
	
	private int price_seq, place_seq;
	private String place_seat_level;
	private int price_seat;
	public SeatsDTO(int price_seq, int place_seq, String place_seat_level, int price_seat) {
		super();
		this.price_seq = price_seq;
		this.place_seq = place_seq;
		this.place_seat_level = place_seat_level;
		this.price_seat = price_seat;
	}
	public SeatsDTO() {
		super();
	}
	public int getPrice_seq() {
		return price_seq;
	}
	public void setPrice_seq(int price_seq) {
		this.price_seq = price_seq;
	}
	public int getPlace_seq() {
		return place_seq;
	}
	public void setPlace_seq(int place_seq) {
		this.place_seq = place_seq;
	}
	public String getPlace_seat_level() {
		return place_seat_level;
	}
	public void setPlace_seat_level(String place_seat_level) {
		this.place_seat_level = place_seat_level;
	}
	public int getPrice_seat() {
		return price_seat;
	}
	public void setPrice_seat(int price_seat) {
		this.price_seat = price_seat;
	}
	
	

}
