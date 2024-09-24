package com.tap.matchlist.dto;

import java.sql.Timestamp;
import java.util.List;

import com.tap.detail.dto.SeatsDTO;

public class MatchListDTO {

   private int application_seq;
   private String homeTeamName;
   private String awayTeamName;
   private Timestamp startDate;
   private Timestamp endDate;
   private Timestamp openDate;
   private String place_name;
   private String homeTeamLogo;
   private String awayTeamLogo;
   private String name;
   private int max_ticket;
   private int place_seq;
   private String age_limit;
   private String id;
   private int sub_category_seq;
   public int getSub_category_seq() {
	return sub_category_seq;
}
public void setSub_category_seq(int sub_category_seq) {
	this.sub_category_seq = sub_category_seq;
}
public String getId() {
	return id;
}
public void setId(String id) {
	this.id = id;
}
public String getStatus() {
	return status;
}
public void setStatus(String status) {
	this.status = status;
}
private String status;
public int getApplication_seq() {
	return application_seq;
}
public void setApplication_seq(int application_seq) {
	this.application_seq = application_seq;
}
public String getHomeTeamName() {
	return homeTeamName;
}
public void setHomeTeamName(String homeTeamName) {
	this.homeTeamName = homeTeamName;
}
public String getAwayTeamName() {
	return awayTeamName;
}
public void setAwayTeamName(String awayTeamName) {
	this.awayTeamName = awayTeamName;
}
public Timestamp getStartDate() {
	return startDate;
}
public void setStartDate(Timestamp startDate) {
	this.startDate = startDate;
}
public Timestamp getEndDate() {
	return endDate;
}
public void setEndDate(Timestamp endDate) {
	this.endDate = endDate;
}
public Timestamp getOpenDate() {
	return openDate;
}
public void setOpenDate(Timestamp openDate) {
	this.openDate = openDate;
}
public String getPlace_name() {
	return place_name;
}
public void setPlaceName(String place_name) {
	this.place_name = place_name;
}
public String getHomeTeamLogo() {
	return homeTeamLogo;
}
public void setHomeTeamLogo(String homeTeamLogo) {
	this.homeTeamLogo = homeTeamLogo;
}
public String getAwayTeamLogo() {
	return awayTeamLogo;
}
public void setAwayTeamLogo(String awayTeamLogo) {
	this.awayTeamLogo = awayTeamLogo;
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public int getMax_ticket() {
	return max_ticket;
}
public void setMax_ticket(int max_ticket) {
	this.max_ticket = max_ticket;
}
public int getPlace_seq() {
	return place_seq;
}
public void setPlace_seq(int place_seq) {
	this.place_seq = place_seq;
}
public String getAge_limit() {
	return age_limit;
}
public void setAge_limit(String age_limit) {
	this.age_limit = age_limit;
}
public MatchListDTO(int application_seq, String homeTeamName, String awayTeamName, Timestamp startDate,
		Timestamp endDate, Timestamp openDate, String place_name, String homeTeamLogo, String awayTeamLogo, String name,
		int max_ticket, int place_seq, String age_limit,String id, String status,int sub_category_seq) {
	super();
	this.application_seq = application_seq;
	this.homeTeamName = homeTeamName;
	this.awayTeamName = awayTeamName;
	this.startDate = startDate;
	this.endDate = endDate;
	this.openDate = openDate;
	this.place_name = place_name;
	this.homeTeamLogo = homeTeamLogo;
	this.awayTeamLogo = awayTeamLogo;
	this.name = name;
	this.max_ticket = max_ticket;
	this.place_seq = place_seq;
	this.age_limit = age_limit;
	this.sub_category_seq = sub_category_seq;
}
public MatchListDTO() {
	super();
}
public void setSeatPrices(List<SeatsDTO> seats) {
	// TODO Auto-generated method stub
	
}



}