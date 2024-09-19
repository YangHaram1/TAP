package com.tap.z_config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.tap.z_filters.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	private JwtAuthenticationFilter JwtFilter;
	
	@Bean
	protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.cors(cors->cors.configurationSource(request->{
			CorsConfiguration config = new CorsConfiguration();
			config.setAllowedOriginPatterns(Arrays.asList("*")); //모든 출처 허용
			//config.setAllowedOrigins(Arrays.asList("http://192.168.1.179:3000")); 개인 주소
			config.setAllowedHeaders(Arrays.asList("*"));
			config.setAllowedMethods(Arrays.asList("*"));
			
			return config;
		})).csrf(csrf->csrf.disable()) //CSRF 공격 방지 기능(보안설정 끄기)
		.formLogin(form->form.disable())// RESTFul 방식에선 불필요
		.httpBasic(basic->basic.disable())// RESTFul 방식에선 불필요
		.authorizeHttpRequests(request->{
			request.requestMatchers(HttpMethod.POST, "/auth/{id}/{pw}").permitAll();//excludePatternPath
			request.requestMatchers(HttpMethod.GET,"/board").permitAll();
			request.requestMatchers(HttpMethod.POST,"/members").permitAll();
			request.requestMatchers(HttpMethod.GET,"/members/id/{id}").permitAll();
			request.requestMatchers(HttpMethod.GET,"/members/email/{email}").permitAll();
			request.requestMatchers(HttpMethod.GET,"/members/findId/{name}/{email}").permitAll();
			request.requestMatchers(HttpMethod.GET,"/artlist/{category}").permitAll();
			request.requestMatchers(HttpMethod.GET,"/artlist/openContents/{category}").permitAll();
			request.requestMatchers(HttpMethod.GET,"/artlist/getTap").permitAll();
			request.requestMatchers(HttpMethod.GET,"/genre/{category}").permitAll();
			request.requestMatchers(HttpMethod.GET,"/detail/{seq}").permitAll();
			request.requestMatchers(HttpMethod.POST,"/members/requestEmailVerification/{email}").permitAll();
			request.requestMatchers(HttpMethod.POST,"/members/verifyEmail").permitAll();
			//request.requestMatchers("/messages").hasRole("ROLE_ADMIN"); 이런식으로 권한 검사
			request.anyRequest().authenticated(); //SecurityContextHolder 안에 Authentication 이 있어야함
		}) 
		.addFilterBefore(JwtFilter, UsernamePasswordAuthenticationFilter.class); //모든 경로는 필터를 거친다
		return http.build();
	}
	
	@Bean
	protected PasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
