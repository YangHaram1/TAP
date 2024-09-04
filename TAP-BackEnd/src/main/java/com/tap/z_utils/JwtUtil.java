package com.tap.z_utils;

import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import jakarta.servlet.http.HttpServletRequest;

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
	
	public String createToken(String id,String role) {	
//		 String roleString = role.stream()
//                 .map(GrantedAuthority::getAuthority) // 권한 이름을 문자열로 변환
//                 .collect(Collectors.joining(","));   // 콤마로 구분된 문자열로 연결
//		 
		return 	JWT.create().
				withSubject(id).
				withClaim("role", role).
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
	
	public String extractToken(HttpServletRequest request) {
		String auth=request.getHeader("Authorization");
		if(auth!=null &&auth.startsWith("Bearer")) {
			return auth.substring(7); //토큰 반환
		}
		return null;
	}
	
}
