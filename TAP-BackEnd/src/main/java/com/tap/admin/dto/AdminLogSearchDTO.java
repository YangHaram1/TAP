package com.tap.admin.dto;

public class AdminLogSearchDTO {
    private String name;
    private String member_id;
    private String log_status;
    private String specific_start_date;
    private String specific_end_date;

    public AdminLogSearchDTO() {}

    public AdminLogSearchDTO(String name, String member_id, String log_status, String specific_start_date, String specific_end_date) {
        this.name = name;
        this.member_id = member_id;
        this.log_status = log_status;
        this.specific_start_date = specific_start_date;
        this.specific_end_date = specific_end_date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMemberId() {
        return member_id;
    }

    public void setMemberId(String member_id) {
        this.member_id = member_id;
    }

    public String getLogStatus() {
        return log_status;
    }

    public void setLogStatus(String log_status) {
        this.log_status = log_status;
    }

    public String getSpecificStartDate() {
        return specific_start_date;
    }

    public void setSpecificStartDate(String specific_start_date) {
        this.specific_start_date = specific_start_date;
    }

    public String getSpecificEndDate() {
        return specific_end_date;
    }

    public void setSpecificEndDate(String specific_end_date) {
        this.specific_end_date = specific_end_date;
    }
}
