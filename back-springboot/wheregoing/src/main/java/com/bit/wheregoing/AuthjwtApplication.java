package com.bit.wheregoing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.bit.wheregoing.config.AppProperties;
import com.bit.wheregoing.config.ClientProperties;

//@SpringBootApplication(scanBasePackages = "com.bit.wheregoing")
//@EntityScan(basePackages = {"com.bit.wheregoing.model"})
//@EnableJpaRepositories(basePackages = {"com.bit.wheregoing.repository"})
@SpringBootApplication
@EnableConfigurationProperties(value = {AppProperties.class, ClientProperties.class})
public class AuthjwtApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthjwtApplication.class, args);
	}

}
