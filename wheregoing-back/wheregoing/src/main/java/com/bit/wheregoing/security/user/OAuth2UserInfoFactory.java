package com.bit.wheregoing.security.user;

import java.util.Map;

import com.bit.wheregoing.exception.OAuth2AuthenticationProcessingException;
import com.bit.wheregoing.model.AuthProvider;

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
    	if(registrationId.equalsIgnoreCase(AuthProvider.google.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(AuthProvider.facebook.toString())) {
            return new FacebookOAuth2UserInfo(attributes);
        } 
         else if (registrationId.equalsIgnoreCase(AuthProvider.kakao.toString())) {
        	 System.out.println("OAuth2UserInfoFactory  : kakao " );
            return new KakaoOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(AuthProvider.naver.toString())) {
        	 System.out.println("OAuth2UserInfoFactory  : naver " );
            return new NaverOAuth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationProcessingException("Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }
}