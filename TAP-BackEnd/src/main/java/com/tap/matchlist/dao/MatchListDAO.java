package com.tap.matchlist.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.matchlist.dto.MatchListDTO;

@Repository
public class MatchListDAO {
    @Autowired
    private SqlSession mybatis;

    public List<MatchListDTO> getBaseballApplications() {
        return mybatis.selectList("MatchList.getBaseballMatches");
    }

    public List<MatchListDTO> getSoccerApplications() {
        return mybatis.selectList("MatchList.getSoccerMatches");
    }
}
