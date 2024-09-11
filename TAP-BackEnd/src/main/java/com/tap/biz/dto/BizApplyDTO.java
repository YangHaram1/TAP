package com.tap.biz.dto;

import java.sql.Timestamp;
import java.util.List;

import com.tap.files.dto.FilesDTO;

public class BizApplyDTO {
	private int application_seq;
	private String id;
	private String name;
	private int place_seq;
	private int sub_category_seq;
	private int genre_seq;
	private String age_limit;
	private Timestamp start_date;
	private Timestamp end_date;
	private int running_time;
	private int running_intertime;
	private Timestamp open_date;
	private String status;
	private Timestamp created_at;
	private Timestamp updated_at;
	private int max_ticket;
	private int away_team_seq;
	private List<TotalScheduleDTO> totalSchedule;	// 회차- 스케쥴 테이블
	private List<CastingDataDTO> castingData;
	private FilesDTO main_poster;
	private String description_content;
	private String noticeContent;
	
	
	
	public BizApplyDTO(int application_seq, String id, String name, int place_seq, int sub_category_seq, int genre_seq,
			String age_limit, Timestamp start_date, Timestamp end_date, int running_time, int running_intertime,
			Timestamp open_date, String status, Timestamp created_at, Timestamp updated_at, int max_ticket,
			int away_team_seq, List<TotalScheduleDTO> totalSchedule, List<CastingDataDTO> castingData,
			FilesDTO main_poster, String description_content, String noticeContent) {
		super();
		this.application_seq = application_seq;
		this.id = id;
		this.name = name;
		this.place_seq = place_seq;
		this.sub_category_seq = sub_category_seq;
		this.genre_seq = genre_seq;
		this.age_limit = age_limit;
		this.start_date = start_date;
		this.end_date = end_date;
		this.running_time = running_time;
		this.running_intertime = running_intertime;
		this.open_date = open_date;
		this.status = status;
		this.created_at = created_at;
		this.updated_at = updated_at;
		this.max_ticket = max_ticket;
		this.away_team_seq = away_team_seq;
		this.totalSchedule = totalSchedule;
		this.castingData = castingData;
		this.main_poster = main_poster;
		this.description_content = description_content;
		this.noticeContent = noticeContent;
	}
	public FilesDTO getMain_poster() {
		return main_poster;
	}
	public void setMain_poster(FilesDTO main_poster) {
		this.main_poster = main_poster;
	}
	public BizApplyDTO(int application_seq, String id, String name, int place_seq, int sub_category_seq, int genre_seq,
			String age_limit, Timestamp start_date, Timestamp end_date, int running_time, int running_intertime,
			Timestamp open_date, String status, Timestamp created_at, Timestamp updated_at, int max_ticket,
			int away_team_seq, List<TotalScheduleDTO> totalSchedule, List<CastingDataDTO> castingData,
			String description_content, String noticeContent) {
		super();
		this.application_seq = application_seq;
		this.id = id;
		this.name = name;
		this.place_seq = place_seq;
		this.sub_category_seq = sub_category_seq;
		this.genre_seq = genre_seq;
		this.age_limit = age_limit;
		this.start_date = start_date;
		this.end_date = end_date;
		this.running_time = running_time;
		this.running_intertime = running_intertime;
		this.open_date = open_date;
		this.status = status;
		this.created_at = created_at;
		this.updated_at = updated_at;
		this.max_ticket = max_ticket;
		this.away_team_seq = away_team_seq;
		this.totalSchedule = totalSchedule;
		this.castingData = castingData;
		this.description_content = description_content;
		this.noticeContent = noticeContent;
	}
	public String getNoticeContent() {
		return noticeContent;
	}
	public void setNoticeContent(String noticeContent) {
		this.noticeContent = noticeContent;
	}
	public BizApplyDTO(int application_seq, String id, String name, int place_seq, int sub_category_seq, int genre_seq,
			String age_limit, Timestamp start_date, Timestamp end_date, int running_time, int running_intertime,
			Timestamp open_date, String status, Timestamp created_at, Timestamp updated_at, int max_ticket,
			int away_team_seq, List<TotalScheduleDTO> totalSchedule, List<CastingDataDTO> castingData,
			String description_content) {
		super();
		this.application_seq = application_seq;
		this.id = id;
		this.name = name;
		this.place_seq = place_seq;
		this.sub_category_seq = sub_category_seq;
		this.genre_seq = genre_seq;
		this.age_limit = age_limit;
		this.start_date = start_date;
		this.end_date = end_date;
		this.running_time = running_time;
		this.running_intertime = running_intertime;
		this.open_date = open_date;
		this.status = status;
		this.created_at = created_at;
		this.updated_at = updated_at;
		this.max_ticket = max_ticket;
		this.away_team_seq = away_team_seq;
		this.totalSchedule = totalSchedule;
		this.castingData = castingData;
		this.description_content = description_content;
	}
	public String getDescription_content() {
		return description_content;
	}
	public void setDescription_content(String description_content) {
		this.description_content = description_content;
	}
	public int getApplication_seq() {
		return application_seq;
	}
	public void setApplication_seq(int application_seq) {
		this.application_seq = application_seq;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getPlace_seq() {
		return place_seq;
	}
	public void setPlace_seq(int place_seq) {
		this.place_seq = place_seq;
	}
	public int getSub_category_seq() {
		return sub_category_seq;
	}
	public void setSub_category_seq(int sub_category_seq) {
		this.sub_category_seq = sub_category_seq;
	}
	public int getGenre_seq() {
		return genre_seq;
	}
	public void setGenre_seq(int genre_seq) {
		this.genre_seq = genre_seq;
	}
	public String getAge_limit() {
		return age_limit;
	}
	public void setAge_limit(String age_limit) {
		this.age_limit = age_limit;
	}
	public Timestamp getStart_date() {
		return start_date;
	}
	public void setStart_date(Timestamp start_date) {
		this.start_date = start_date;
	}
	public Timestamp getEnd_date() {
		return end_date;
	}
	public void setEnd_date(Timestamp end_date) {
		this.end_date = end_date;
	}
	public int getRunning_time() {
		return running_time;
	}
	public void setRunning_time(int running_time) {
		this.running_time = running_time;
	}
	public int getRunning_intertime() {
		return running_intertime;
	}
	public void setRunning_intertime(int running_intertime) {
		this.running_intertime = running_intertime;
	}
	public Timestamp getOpen_date() {
		return open_date;
	}
	public void setOpen_date(Timestamp open_date) {
		this.open_date = open_date;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Timestamp getCreated_at() {
		return created_at;
	}
	public void setCreated_at(Timestamp created_at) {
		this.created_at = created_at;
	}
	public Timestamp getUpdated_at() {
		return updated_at;
	}
	public void setUpdated_at(Timestamp updated_at) {
		this.updated_at = updated_at;
	}
	public int getMax_ticket() {
		return max_ticket;
	}
	public void setMax_ticket(int max_ticket) {
		this.max_ticket = max_ticket;
	}
	public int getAway_team_seq() {
		return away_team_seq;
	}
	public void setAway_team_seq(int away_team_seq) {
		this.away_team_seq = away_team_seq;
	}
	public List<TotalScheduleDTO> getTotalSchedule() {
		return totalSchedule;
	}
	public void setTotalSchedule(List<TotalScheduleDTO> totalSchedule) {
		this.totalSchedule = totalSchedule;
	}
	public List<CastingDataDTO> getCastingData() {
		return castingData;
	}
	public void setCastingData(List<CastingDataDTO> castingData) {
		this.castingData = castingData;
	}
	public BizApplyDTO(int application_seq, String id, String name, int place_seq, int sub_category_seq, int genre_seq,
			String age_limit, Timestamp start_date, Timestamp end_date, int running_time, int running_intertime,
			Timestamp open_date, String status, Timestamp created_at, Timestamp updated_at, int max_ticket,
			int away_team_seq, List<TotalScheduleDTO> totalSchedule, List<CastingDataDTO> castingData) {
		super();
		this.application_seq = application_seq;
		this.id = id;
		this.name = name;
		this.place_seq = place_seq;
		this.sub_category_seq = sub_category_seq;
		this.genre_seq = genre_seq;
		this.age_limit = age_limit;
		this.start_date = start_date;
		this.end_date = end_date;
		this.running_time = running_time;
		this.running_intertime = running_intertime;
		this.open_date = open_date;
		this.status = status;
		this.created_at = created_at;
		this.updated_at = updated_at;
		this.max_ticket = max_ticket;
		this.away_team_seq = away_team_seq;
		this.totalSchedule = totalSchedule;
		this.castingData = castingData;
	}
	public BizApplyDTO() {
		super();
	}
	
	
}
