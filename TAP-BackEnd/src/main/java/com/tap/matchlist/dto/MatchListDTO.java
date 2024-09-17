package com.tap.matchlist.dto;

import java.sql.Timestamp;

public class MatchListDTO {
	 private String homeTeamName;
	    private String awayTeamName;
	    private Timestamp startDate;
	    private Timestamp endDate;
	    private Timestamp openDate;
	    private int placeSeq;
		public MatchListDTO() {
			super();
		}
		public MatchListDTO(String homeTeamName, String awayTeamName, Timestamp startDate, Timestamp endDate,
				Timestamp openDate, int placeSeq) {
			super();
			this.homeTeamName = homeTeamName;
			this.awayTeamName = awayTeamName;
			this.startDate = startDate;
			this.endDate = endDate;
			this.openDate = openDate;
			this.placeSeq = placeSeq;
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
		public int getPlaceSeq() {
			return placeSeq;
		}
		public void setPlaceSeq(int placeSeq) {
			this.placeSeq = placeSeq;
		}
}
