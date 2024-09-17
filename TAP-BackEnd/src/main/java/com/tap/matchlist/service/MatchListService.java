package com.tap.matchlist.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.matchlist.dao.MatchListDAO;

@Service
public class MatchListService {
    @Autowired
    private MatchListDAO mlDao;

    public List<Map<String, Object>> getBaseballGames() {
        List<Map<String, Object>> result = mlDao.getBaseballApplications();
        System.out.println("Baseball Games Service Result: " + result); // 결과 출력
        return result;
    }

    public List<Map<String, Object>> getSoccerGames() {
        List<Map<String, Object>> result = mlDao.getSoccerApplications();
        System.out.println("Soccer Games Service Result: " + result); // 결과 출력
        return result;
    }
}
