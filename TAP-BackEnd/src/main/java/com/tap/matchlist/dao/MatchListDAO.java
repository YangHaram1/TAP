package com.tap.matchlist.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MatchListDAO {
    @Autowired
    private SqlSession mybatis;

    public List<Map<String, Object>> getBaseballApplications() {
        return mybatis.selectList("MatchList.getBaseballMatches");
    }

    public List<Map<String, Object>> getSoccerApplications() {
        return mybatis.selectList("MatchList.getSoccerMatches");
    }
}
