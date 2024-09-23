package com.tap.admin.dto;

public class AdminDashDTO {
	private String total_sum;
	private int total_count;
	public String getTotal_sum() {
		return total_sum;
	}
	public void setTotal_sum(String total_sum) {
		this.total_sum = total_sum;
	}
	public int getTotal_count() {
		return total_count;
	}
	public void setTotal_count(int total_count) {
		this.total_count = total_count;
	}
	public AdminDashDTO(String total_sum, int total_count) {
		super();
		this.total_sum = total_sum;
		this.total_count = total_count;
	}
	public AdminDashDTO() {}
}
