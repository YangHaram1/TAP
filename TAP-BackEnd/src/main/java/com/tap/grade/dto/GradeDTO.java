package com.tap.grade.dto;

public class GradeDTO {

	private int seq;
	private String name;
	private int min_point;
	private int benefits;
	private int grade_order;
	public GradeDTO(int seq, String name, int min_point, int benefits, int grade_order) {
		super();
		this.seq = seq;
		this.name = name;
		this.min_point = min_point;
		this.benefits = benefits;
		this.grade_order = grade_order;
	}
	public GradeDTO() {}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
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
	public int getGrade_order() {
		return grade_order;
	}
	public void setGrade_order(int grade_order) {
		this.grade_order = grade_order;
	}
	
}
