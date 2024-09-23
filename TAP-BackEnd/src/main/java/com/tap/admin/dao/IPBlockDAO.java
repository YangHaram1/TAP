package com.tap.admin.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.admin.dto.IPBlockDTO;

@Repository
public class IPBlockDAO {

    @Autowired
    private SqlSession mybatis;

    public List<IPBlockDTO> getBlockedIPs() {
        return mybatis.selectList("IPBlock.getBlockedIPs");
    }

    public void blockIP(IPBlockDTO ipBlock) {
        mybatis.insert("IPBlock.blockIP", ipBlock);
    }

    public void unblockIP(String ip) {
        mybatis.update("IPBlock.unblockIP", ip);
    }

    public int getBlockedIPCount(String ip) {
        return mybatis.selectOne("IPBlock.isIPBlocked", ip);
    }


    public int incrementLoginAttempts(String ip) {
        return mybatis.update("IPBlock.incrementLoginAttempts", ip);
    }

    public void resetLoginAttempts(String ip) {
        mybatis.update("IPBlock.resetLoginAttempts", ip);
    }

    public IPBlockDTO getIPBlockInfo(String ip) {
        return mybatis.selectOne("IPBlock.getIPBlockInfo", ip);
    }
}