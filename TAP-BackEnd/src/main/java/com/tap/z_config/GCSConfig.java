package com.tap.z_config;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import org.springframework.beans.factory.annotation.Value;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

@Configuration
public class GCSConfig {
	/*
	@Value("${gcp.credentials.location}")
	private Resource credentialLoacation;
	
	@Value("${gcp.project.id}")
	private String projectId;
	
	@Bean
	public Storage storage() throws IOException{
		 GoogleCredentials cred =GoogleCredentials.fromStream(credentialLoacation.getInputStream());
		 return StorageOptions.newBuilder().setCredentials(cred).setProjectId(projectId).build().getService();
	}
	*/
}
