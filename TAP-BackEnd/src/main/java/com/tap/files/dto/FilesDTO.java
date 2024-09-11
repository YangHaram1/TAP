package com.tap.files.dto;

public class FilesDTO {
	
	private int files_seq;
	private String files_oriname, files_sysname, files_type, files_from;
	private int files_parnet_seq;

	public FilesDTO(int files_seq, String files_oriname, String files_sysname, String files_type, String files_from,
			int files_parnet_seq) {
		super();
		this.files_seq = files_seq;
		this.files_oriname = files_oriname;
		this.files_sysname = files_sysname;
		this.files_type = files_type;
		this.files_from = files_from;
		this.files_parnet_seq = files_parnet_seq;
	}
	public int getFiles_parnet_seq() {
		return files_parnet_seq;
	}
	public void setFiles_parnet_seq(int files_parnet_seq) {
		this.files_parnet_seq = files_parnet_seq;
	}
	public FilesDTO() {
		super();
	}
	public int getFiles_seq() {
		return files_seq;
	}
	public void setFiles_seq(int files_seq) {
		this.files_seq = files_seq;
	}
	public String getFiles_oriname() {
		return files_oriname;
	}
	public void setFiles_oriname(String files_oriname) {
		this.files_oriname = files_oriname;
	}
	public String getFiles_sysname() {
		return files_sysname;
	}
	public void setFiles_sysname(String files_sysname) {
		this.files_sysname = files_sysname;
	}
	public String getFiles_type() {
		return files_type;
	}
	public void setFiles_type(String files_type) {
		this.files_type = files_type;
	}
	public String getFiles_from() {
		return files_from;
	}
	public void setFiles_from(String files_from) {
		this.files_from = files_from;
	}
	
	
	

}
