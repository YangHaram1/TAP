package com.tap.board.dto;

import java.sql.Timestamp;

public class BoardDTO {
	private int board_seq;
	private String member_id;
	private String title;
	private String contents;
	private Timestamp write_date;
	private int views;
	public BoardDTO(int board_seq, String member_id, String title, String contents, Timestamp write_date, int views) {
		super();
		this.board_seq = board_seq;
		this.member_id = member_id;
		this.title = title;
		this.contents = contents;
		this.write_date = write_date;
		this.views = views;
	}
	public BoardDTO() {
		super();
	}
	public int getBoard_seq() {
		return board_seq;
	}
	public void setBoard_seq(int board_seq) {
		this.board_seq = board_seq;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
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
	public Timestamp getWrite_date() {
		return write_date;
	}
	public void setWrite_date(Timestamp write_date) {
		this.write_date = write_date;
	}
	public int getViews() {
		return views;
	}
	public void setViews(int views) {
		this.views = views;
	}
	
	
	
}
