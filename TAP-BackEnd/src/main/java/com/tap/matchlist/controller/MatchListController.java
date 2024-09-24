package com.tap.matchlist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.detail.dto.SeatsDTO;
import com.tap.detail.service.SeatsService;
import com.tap.matchlist.dto.MatchListDTO;
import com.tap.matchlist.service.MatchListService;

@RestController
@RequestMapping("/matchlist")
public class MatchListController {
    @Autowired
    private MatchListService mlServ;
    @Autowired
    private SeatsService sServ;

    @GetMapping("/baseball")
    public ResponseEntity<List<MatchListDTO>> getBaseballMatches() {
        List<MatchListDTO> matches = mlServ.getBaseballGames();
        
        // 각 매치에 대해 좌석 정보를 추가
        for (MatchListDTO match : matches) {
            List<SeatsDTO> seats = sServ.getPrice(match.getPlace_seq());
            match.setSeatPrices(seats); // 매치 객체에 좌석 정보 추가
        }
        
        return ResponseEntity.ok(matches);
    }

    @GetMapping("/soccer")
    public ResponseEntity<List<MatchListDTO>> getSoccerMatches() {
        List<MatchListDTO> matches = mlServ.getSoccerGames();

        // 각 매치에 대해 좌석 정보를 추가
        for (MatchListDTO match : matches) {
            List<SeatsDTO> seats = sServ.getPrice(match.getPlace_seq());
            match.setSeatPrices(seats); // 매치 객체에 좌석 정보 추가
        }
        
        return ResponseEntity.ok(matches);
    }

}
