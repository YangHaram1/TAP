package com.tap.coupon.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tap.coupon.dao.CouponDAO;
import com.tap.coupon.dao.CouponTypeDAO;
import com.tap.coupon.dto.CouponDTO;
import com.tap.coupon.dto.CouponMemberDTO;
import com.tap.coupon.dto.CouponTypeDTO;
import com.tap.members.dao.MembersDAO;

import jakarta.transaction.Transactional;

@Service
public class CouponService {

	@Autowired
	private CouponDAO cdao;
	
	@Autowired
	private MembersDAO mdao;
	
	@Autowired
	private CouponTypeDAO ctdao;
	
	@Transactional
	public boolean insert(String id,int couponOrder) throws Exception {
		String check=mdao.checkCoupon(id);
		if(check.equals("Y")) {
			List<CouponTypeDTO> list =ctdao.selectByOrder(couponOrder);	
			for (CouponTypeDTO dto : list) {
				CouponDTO item=new CouponDTO();
				item.setMember_id(id);
				item.setType_seq(dto.getSeq());
				item.setState(1); //1이 사용가능 
				cdao.insert(item);
			}
			mdao.updateCoupon(id);
			return true;
		}
		else {
			
			return false;
		}
	}
	
	public List<CouponMemberDTO> selectById(String id) {
		return cdao.selectById(id);
	}


}
