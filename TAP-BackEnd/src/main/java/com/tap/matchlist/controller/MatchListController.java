package com.tap.matchlist.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tap.matchlist.service.MatchListService;

@RestController
@RequestMapping("/matchlist")
public class MatchListController {
    @Autowired
    private MatchListService mlServ;

    @GetMapping("/baseball")
    public ResponseEntity<List<Map<String, Object>>> getBaseballMatches() {
        List<Map<String, Object>> matches = mlServ.getBaseballGames();
        return ResponseEntity.ok(matches);
    }

    @GetMapping("/soccer")
    public ResponseEntity<List<Map<String, Object>>> getSoccerMatches() {
        List<Map<String, Object>> matches = mlServ.getSoccerGames();
        return ResponseEntity.ok(matches);
    }
}
