package com.tap.team.dto;

public class TeamDTO {
	
	private int team_seq;
	private int place_seq;
	private String team_name;
	private String team_type;
	private String logo_image;
	public TeamDTO() {}
	public TeamDTO(int team_seq, int place_seq, String team_name, String team_type, String logo_image) {
		super();
		this.team_seq = team_seq;
		this.place_seq = place_seq;
		this.team_name = team_name;
		this.team_type = team_type;
		this.logo_image = logo_image;
	}
	public int getTeam_seq() {
		return team_seq;
	}
	public void setTeam_seq(int team_seq) {
		this.team_seq = team_seq;
	}
	public int getPlace_seq() {
		return place_seq;
	}
	public void setPlace_seq(int place_seq) {
		this.place_seq = place_seq;
	}
	public String getTeam_name() {
		return team_name;
	}
	public void setTeam_name(String team_name) {
		this.team_name = team_name;
	}
	public String getTeam_type() {
		return team_type;
	}
	public void setTeam_type(String team_type) {
		this.team_type = team_type;
	}
	public String getLogo_image() {
		return logo_image;
	}
	public void setLogo_image(String logo_image) {
		this.logo_image = logo_image;
	}
	
}
