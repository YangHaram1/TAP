package com.tap.admin.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tap.admin.dao.IPBlockDAO;
import com.tap.admin.dto.IPBlockDTO;

@Service
public class IPBlockService {


    @Autowired
    private IPBlockDAO ipBlockDAO;

    public PageInfo<IPBlockDTO> getBlockedIPs(int page, int size) {
        PageHelper.startPage(page, size);
        List<IPBlockDTO> blockedIPs = ipBlockDAO.getBlockedIPs();
        return new PageInfo<>(blockedIPs);
    }

    public void blockIP(String ip, String reason) {
        IPBlockDTO ipBlock = new IPBlockDTO();
        ipBlock.setIp(ip);
        ipBlock.setReason(reason == null ? "비밀번호 5회 이상 실패" : reason);
        ipBlock.setBlockedAt(LocalDateTime.now());
        ipBlock.setLoginAttempts(5);
        ipBlock.setLastAttemptAt(LocalDateTime.now());
        ipBlockDAO.blockIP(ipBlock);
    }

    public void unblockIP(String ip) {
        ipBlockDAO.unblockIP(ip);
    }

    public boolean isIPBlocked(String ip) {
        return ipBlockDAO.getBlockedIPCount(ip) > 0;
    }

    public int incrementLoginAttempts(String ip) {
        IPBlockDTO ipBlock = ipBlockDAO.getIPBlockInfo(ip);
        if (ipBlock == null) {
            ipBlock = new IPBlockDTO();
            ipBlock.setIp(ip);
            ipBlock.setLoginAttempts(1);
            ipBlock.setLastAttemptAt(LocalDateTime.now());
            ipBlockDAO.blockIP(ipBlock);
            return 1;
        } else {
            int attempts = ipBlockDAO.incrementLoginAttempts(ip);
            if (attempts >= MAX_LOGIN_ATTEMPTS) {
                blockIP(ip, "로그인 " + MAX_LOGIN_ATTEMPTS + "회 실패");
            }
            return attempts;
        }
    }

    public void resetLoginAttempts(String ip) {
        ipBlockDAO.resetLoginAttempts(ip);
    }

    private static final int MAX_LOGIN_ATTEMPTS = 5;
}