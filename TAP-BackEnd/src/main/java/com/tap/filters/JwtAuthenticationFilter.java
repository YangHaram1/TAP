package com.tap.filters;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.tap.services.MembersService;
import com.tap.utils.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{
	@Autowired
	private JwtUtil jwt;
	@Autowired
	private MembersService mserv;
	
	private String extractToken(HttpServletRequest request) {
		String auth=request.getHeader("Authorization");
		if(auth!=null &&auth.startsWith("Bearer")) {
			return auth.substring(7); //토큰 반환
		}
		return null;
	}
	
	//SecurityContextHolder 에 Authentcation 객체 존재 여부로 인증을 판단
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String token=extractToken(request);
		if(token!=null &&jwt.isVerified(token)) {//토큰 인증
			String id=jwt.getSubject(token);
			UserDetails user=mserv.loadUserByUsername(id);
			if(user!=null) {
				Authentication auth= new UsernamePasswordAuthenticationToken(user.getUsername(),null,user.getAuthorities());// Authentication 객체를 상속받은 객체
				SecurityContextHolder.getContext().setAuthentication(auth);
			}
			
		}
		filterChain.doFilter(request, response);	
	}
}
