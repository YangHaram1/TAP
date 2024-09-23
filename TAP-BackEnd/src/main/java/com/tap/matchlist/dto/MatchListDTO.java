package com.tap.matchlist.dto;

import java.sql.Timestamp;

public class MatchListDTO {

   private int application_seq;
   private String homeTeamName;
   private String awayTeamName;
   private Timestamp startDate;
   private Timestamp endDate;
   private Timestamp openDate;
   private String placeName;
   private String homeTeamLogo;
   private String awayTeamLogo;
   private String name;
   private int max_ticket;
   public int getMax_ticket() {
	return max_ticket;
}
public void setMax_ticket(int max_ticket) {
	this.max_ticket = max_ticket;
}
private int place_seq;
    public int getPlace_seq() {
	return place_seq;
}
public void setPlace_seq(int place_seq) {
	this.place_seq = place_seq;
}
	public int getApplication_seq() {
      return application_seq;
   }
   public void setApplication_seq(int application_seq) {
      this.application_seq = application_seq;
   }
   public void setPlaceName(String placeName) {
      this.placeName = placeName;
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
      public String getPlaceName() {
         return placeName;
      }
      public void setPlaceSeq(String palceName) {
         this.placeName = placeName;
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
	public MatchListDTO(int application_seq, String homeTeamName, String awayTeamName, Timestamp startDate,
			Timestamp endDate, Timestamp openDate, String placeName, String homeTeamLogo, String awayTeamLogo,
			String name,int place_seq,int max_ticket) {
		super();
		this.application_seq = application_seq;
		this.homeTeamName = homeTeamName;
		this.awayTeamName = awayTeamName;
		this.startDate = startDate;
		this.endDate = endDate;
		this.openDate = openDate;
		this.placeName = placeName;
		this.homeTeamLogo = homeTeamLogo;
		this.awayTeamLogo = awayTeamLogo;
		this.name = name;
		this.place_seq = place_seq;
	}
	public MatchListDTO() {
		super();
	}


}