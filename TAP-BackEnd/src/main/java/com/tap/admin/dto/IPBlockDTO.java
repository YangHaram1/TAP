package com.tap.admin.dto;

import java.time.LocalDateTime;

public class IPBlockDTO {
    private Long id;
    private String ip;
    private String reason;
    private LocalDateTime blockedAt;
    private LocalDateTime unblockedAt;
    private int loginAttempts;
    private LocalDateTime lastAttemptAt;


    public IPBlockDTO() {
    }


    public IPBlockDTO(Long id, String ip, String reason, LocalDateTime blockedAt, LocalDateTime unblockedAt, int loginAttempts, LocalDateTime lastAttemptAt) {
        this.id = id;
        this.ip = ip;
        this.reason = reason;
        this.blockedAt = blockedAt;
        this.unblockedAt = unblockedAt;
        this.loginAttempts = loginAttempts;
        this.lastAttemptAt = lastAttemptAt;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public LocalDateTime getBlockedAt() {
        return blockedAt;
    }

    public void setBlockedAt(LocalDateTime blockedAt) {
        this.blockedAt = blockedAt;
    }

    public LocalDateTime getUnblockedAt() {
        return unblockedAt;
    }

    public void setUnblockedAt(LocalDateTime unblockedAt) {
        this.unblockedAt = unblockedAt;
    }

    public int getLoginAttempts() {
        return loginAttempts;
    }

    public void setLoginAttempts(int loginAttempts) {
        this.loginAttempts = loginAttempts;
    }

    public LocalDateTime getLastAttemptAt() {
        return lastAttemptAt;
    }

    public void setLastAttemptAt(LocalDateTime lastAttemptAt) {
        this.lastAttemptAt = lastAttemptAt;
    }
}
