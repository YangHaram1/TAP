package com.tap.biz.dto;

import java.util.List;

public class CastingData {
	private List<CastingDataDTO> castingData;



	public CastingData(List<CastingDataDTO> castingData) {
		super();
		this.castingData = castingData;
	}



	public List<CastingDataDTO> getCastingData() {
		return castingData;
	}



	public void setCastingData(List<CastingDataDTO> castingData) {
		this.castingData = castingData;
	}



	public CastingData() {
		super();
	}
	
}
