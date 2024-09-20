package com.tap.admin.dto;

import java.time.LocalDateTime;

public class AdminLogDTO {
    private int log_seq;
    private String member_id;
    private String name;
    private String client_ip;
    private LocalDateTime local_logtime;
    private String log_status;

    public AdminLogDTO() {
    }

    public AdminLogDTO(int log_seq, String member_id, String name, String client_ip, LocalDateTime local_logtime, String log_status) {
        this.log_seq = log_seq;
        this.member_id = member_id;
        this.name = name;
        this.client_ip = client_ip;
        this.local_logtime = local_logtime;
        this.log_status = log_status;
    }

    public int getLogSeq() {
        return log_seq;
    }

    public String getMemberId() {
        return member_id;
    }

    public String getName() {
        return name;
    }

    public String getClientIp() {
        return client_ip;
    }

    public LocalDateTime getLocalLogtime() {
        return local_logtime;
    }

    public String getLogStatus() {
        return log_status;
    }

    public void setLogSeq(int log_seq) {
        this.log_seq = log_seq;
    }

    public void setMemberId(String member_id) {
        this.member_id = member_id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setClientIp(String client_ip) {
        this.client_ip = client_ip;
    }

    public void setLocalLogtime(LocalDateTime local_logtime) {
        this.local_logtime = local_logtime;
    }

    public void setLogStatus(String log_status) {
        this.log_status = log_status;
    }
}
