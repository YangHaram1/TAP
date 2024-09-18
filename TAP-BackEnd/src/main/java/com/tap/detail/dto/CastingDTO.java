package com.tap.detail.dto;

public class CastingDTO {
	
	private String casting_name, casting_role, file_sysname;

	public CastingDTO(String casting_name, String casting_role, String file_sysname) {
		super();
		this.casting_name = casting_name;
		this.casting_role = casting_role;
		this.file_sysname = file_sysname;
	}

	public CastingDTO() {
		super();
	}

	public String getCasting_name() {
		return casting_name;
	}

	public void setCasting_name(String casting_name) {
		this.casting_name = casting_name;
	}

	public String getCasting_role() {
		return casting_role;
	}

	public void setCasting_role(String casting_role) {
		this.casting_role = casting_role;
	}

	public String getFile_sysname() {
		return file_sysname;
	}

	public void setFile_sysname(String file_sysname) {
		this.file_sysname = file_sysname;
	}
	
	

}
