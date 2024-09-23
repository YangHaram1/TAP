package com.tap.board.dao;

import java.util.List;
import java.util.Map;

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
	public List<BoardDTO> selectAll(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return mybatis.selectList("Board.selectAll",map);
	}
	public int getBoardCount(Map<String, Object> map) {
		return mybatis.selectOne("Board.getInquiryCount",map);
	}
	public int insert(BoardDTO dto) {
		return mybatis.insert("Board.insert",dto);
	}
}
