package com.tap.artlist.dto;

public class GenreDTO {

	private int genre_seq, sub_category_seq;
	private String genre_name;
	
	public GenreDTO() {
		super();
	}
	
	public GenreDTO(int genre_seq, int sub_category_seq, String genre_name) {
		super();
		this.genre_seq = genre_seq;
		this.sub_category_seq = sub_category_seq;
		this.genre_name = genre_name;
	}
	
	public int getGenre_seq() {
		return genre_seq;
	}
	public void setGenre_seq(int genre_seq) {
		this.genre_seq = genre_seq;
	}
	public int getSub_category_seq() {
		return sub_category_seq;
	}
	public void setSub_category_seq(int sub_category_seq) {
		this.sub_category_seq = sub_category_seq;
	}
	public String getGenre_name() {
		return genre_name;
	}
	public void setGenre_name(String genre_name) {
		this.genre_name = genre_name;
	}
	
	
}
