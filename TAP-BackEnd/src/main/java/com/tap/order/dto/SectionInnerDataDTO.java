package com.tap.order.dto;

public class SectionInnerDataDTO {
	
	private int section_seq;
	private String section_name;
	private int section_seat_grades_seq;
	private String seat_grade;
	private int seat_row, seat_col_start, seat_col_end;
	public SectionInnerDataDTO(int section_seq, String section_name, int section_seat_grades_seq, String seat_grade,
			int seat_row, int seat_col_start, int seat_col_end) {
		super();
		this.section_seq = section_seq;
		this.section_name = section_name;
		this.section_seat_grades_seq = section_seat_grades_seq;
		this.seat_grade = seat_grade;
		this.seat_row = seat_row;
		this.seat_col_start = seat_col_start;
		this.seat_col_end = seat_col_end;
	}
	public SectionInnerDataDTO() {
		super();
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
	public int getSection_seat_grades_seq() {
		return section_seat_grades_seq;
	}
	public void setSection_seat_grades_seq(int section_seat_grades_seq) {
		this.section_seat_grades_seq = section_seat_grades_seq;
	}
	public String getSeat_grade() {
		return seat_grade;
	}
	public void setSeat_grade(String seat_grade) {
		this.seat_grade = seat_grade;
	}
	public int getSeat_row() {
		return seat_row;
	}
	public void setSeat_row(int seat_row) {
		this.seat_row = seat_row;
	}
	public int getSeat_col_start() {
		return seat_col_start;
	}
	public void setSeat_col_start(int seat_col_start) {
		this.seat_col_start = seat_col_start;
	}
	public int getSeat_col_end() {
		return seat_col_end;
	}
	public void setSeat_col_end(int seat_col_end) {
		this.seat_col_end = seat_col_end;
	}
	
	

}
