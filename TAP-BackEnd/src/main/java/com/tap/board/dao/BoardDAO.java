package com.tap.board.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tap.board.dto.BoardDTO;

@Repository
public class BoardDAO {
	@Autowired
	private SqlSession mybatis;
	
	public List<BoardDTO> getAllBoard(){
		return mybatis.selectList("Board.getAllBoard");
	}
}
