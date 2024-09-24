package com.tap.matchlist.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.matchlist.dao.MatchListDAO;
import com.tap.matchlist.dto.MatchListDTO;

@Service
public class MatchListService {
    @Autowired
    private MatchListDAO mlDao;

    public List<MatchListDTO> getBaseballGames() {
        List<MatchListDTO> games = mlDao.getBaseballApplications();
        System.out.println("Baseball Games: " + games); // 결과 출력
        return games;
    }

    public List<MatchListDTO> getSoccerGames() {
        return mlDao.getSoccerApplications();
    }
    
}
