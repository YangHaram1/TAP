package com.tap.order.dto;

import java.sql.Timestamp;

public class OrdersDTO {
	
	private int order_seq, application_seq;
	private String member_id;
	private Timestamp order_date;
	private String total_price, status, delivery_status, pay, delivery_method;
	private int delivery_seq;
	
	public OrdersDTO(int order_seq, int application_seq, String member_id, Timestamp order_date, String total_price,
			String status, String delivery_status, String pay, String delivery_method, int delivery_seq) {
		super();
		this.order_seq = order_seq;
		this.application_seq = application_seq;
		this.member_id = member_id;
		this.order_date = order_date;
		this.total_price = total_price;
		this.status = status;
		this.delivery_status = delivery_status;
		this.pay = pay;
		this.delivery_method = delivery_method;
		this.delivery_seq = delivery_seq;
	}
	public OrdersDTO() {
		super();
	}
	public int getOrder_seq() {
		return order_seq;
	}
	public void setOrder_seq(int order_seq) {
		this.order_seq = order_seq;
	}
	public int getApplication_seq() {
		return application_seq;
	}
	public void setApplication_seq(int application_seq) {
		this.application_seq = application_seq;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	public Timestamp getOrder_date() {
		return order_date;
	}
	public void setOrder_date(Timestamp order_date) {
		this.order_date = order_date;
	}
	public String getTotal_price() {
		return total_price;
	}
	public void setTotal_price(String total_price) {
		this.total_price = total_price;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDelivery_status() {
		return delivery_status;
	}
	public void setDelivery_status(String delivery_status) {
		this.delivery_status = delivery_status;
	}
	public String getPay() {
		return pay;
	}
	public void setPay(String pay) {
		this.pay = pay;
	}
	public String getDelivery_method() {
		return delivery_method;
	}
	public void setDelivery_method(String delivery_method) {
		this.delivery_method = delivery_method;
	}
	public int getDelivery_seq() {
		return delivery_seq;
	}
	public void setDelivery_seq(int delivery_seq) {
		this.delivery_seq = delivery_seq;
	}
	
	
	

}
