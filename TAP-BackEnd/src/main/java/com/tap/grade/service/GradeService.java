package com.tap.grade.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.grade.dao.GradeDAO;
import com.tap.grade.dto.GradeDTO;
@Service
public class GradeService {
	@Autowired
	private GradeDAO gDao;
    public List<GradeDTO> getGrade() throws Exception{
    	return gDao.getGrade();
    }
	public List<GradeDTO> selectAll() throws Exception {
		return gDao.selectAll();
		}
	public Map<String, Object> selectList(Map<String, Object> map)  throws Exception{
		if(((String)map.get("target")).equals("grade_order")) {
			if(((String)map.get("keyword")).equals("")) {
				map.put("target","");
			}
		}
		
		Map<String, Object> result =new HashMap<>();
		result.put("list", gDao.selectList(map));
		result.put("count", gDao.getCount(map));
		
		return result;
	}
	public int delete(int seq) {
		return gDao.delete(seq);
	}

}
