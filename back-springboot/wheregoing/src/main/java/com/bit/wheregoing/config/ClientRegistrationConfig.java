package com.bit.wheregoing.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;

import com.bit.wheregoing.security.*;
import com.bit.wheregoing.security.user.CustomOAuth2Provider;

import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class ClientRegistrationConfig {
	
	 	@Autowired(required = true)
	    private ClientProperties clientProperties;

	    @Bean
	    public ClientRegistrationRepository clientRegistrationRepository() {
	        List<ClientRegistration> registrations = clientProperties.getRegistration().entrySet().stream()
	                .map(c -> getRegistration(c.getKey(), c.getValue()))
	                .filter(registration -> registration != null)
	                .collect(Collectors.toList());

	        return new InMemoryClientRegistrationRepository(registrations);
	    }

	    private ClientRegistration getRegistration(String client, ClientProperties.Config config) {
	        String clientId = config.getClientId();
	        System.out.println("getRegistration"+clientId);
	        String clientSecret = config.getClientSecret();
	        System.out.println("getRegistration"+clientSecret);
	        String redirectUri = config.getRedirectUri();
	        System.out.println("getRegistration uri "+redirectUri); // null이네? 왜  
	        List<String> scopes = config.getScope();

	        return CustomOAuth2Provider.valueOf(client).getBuilder(client)
	                .clientId(clientId).clientSecret(clientSecret)
	                .redirectUri(redirectUri)
	                .scope(scopes).build();
	    }
}
