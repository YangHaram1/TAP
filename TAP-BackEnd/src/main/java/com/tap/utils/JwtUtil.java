package com.tap.utils;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

@Component
public class JwtUtil {
	
	
	//토근이 만료되기 까지 걸리는 시간 값
	private long expriation=86400; //하루 86400초
	private Algorithm algo;
	private JWTVerifier verifier;
	public JwtUtil(@Value("${jwt.secret}")String secret) {
		this.algo=Algorithm.HMAC256(secret);
		this.verifier=JWT.require(algo).build();
	}
	
	public String createToken(String id) {	
		return 	JWT.create().
				withSubject(id).
				withIssuedAt(new Date()).
				withExpiresAt(new Date(System.currentTimeMillis()+expriation*1000)).
				sign(this.algo);
	}
	public boolean isVerified(String token) {
		try {
			this.verifier.verify(token);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}	
	}
	
	public DecodedJWT verify(String token) {
		
		return this.verifier.verify(token);// 토큰 검증 
	}
	
	public String getSubject(String token) {
		return this.verifier.verify(token).getSubject(); //id 값 가저오기 
	}
	
}
