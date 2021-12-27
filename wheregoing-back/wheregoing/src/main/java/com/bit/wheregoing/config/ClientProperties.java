package com.bit.wheregoing.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@ConfigurationProperties(prefix = "spring.security.oauth2.client")
public class ClientProperties {
	private final Map<String, Config> registration = new HashMap<>();

    public static class Config {
        private String clientId;
        private String clientSecret;
        private String redirectUri;
        private List<String> scope = new ArrayList<>();

        public String getClientId() {
            return clientId;
        }

        public void setClientId(String clientId) {
            this.clientId = clientId;
        }

        public String getClientSecret() {
            return clientSecret;
        }

        public void setClientSecret(String clientSecret) {
            this.clientSecret = clientSecret;
        }
        // 여기문제 
        public String getRedirectUri() {
        	System.out.println("테스트 1");
            return redirectUri;
        }

        public void setRedirectUri(String redirectUri) {
        	System.out.println("테스트 2");
            this.redirectUri = redirectUri;
        }

        public List<String> getScope() {
            return scope;
        }

        public void setScope(List<String> scope) {
            this.scope = scope;
        }
    }

    public Map<String, Config> getRegistration() {
        return registration;
    }
}