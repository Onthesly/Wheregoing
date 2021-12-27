package com.bit.wheregoing.security.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.bit.wheregoing.exception.OAuth2AuthenticationProcessingException;
import com.bit.wheregoing.model.AuthProvider;
import com.bit.wheregoing.model.User;
import com.bit.wheregoing.repository.UserRepository;
import com.bit.wheregoing.security.UserPrincipal;
import com.bit.wheregoing.security.user.OAuth2UserInfo;
import com.bit.wheregoing.security.user.OAuth2UserInfoFactory;

import java.time.LocalDateTime;
import java.util.Optional;


@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest); // 여기? 
//        System.out.println("loadUser "+oAuth2User.getName());
        try {
        	 System.out.println("CustomOAuth2UserService loadUser 1"+oAuth2User.getName());
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
        	System.out.println("kakao 에러 테스트 1  loadUser" );
            throw ex;
        } catch (Exception ex) {
        	System.out.println("kakao 에러 테스트 2  loadUser");
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if(StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
        	System.out.println("processOAuth2User  email "+oAuth2UserInfo.getEmail()); // 카카오 이메일이  null?
            throw new OAuth2AuthenticationProcessingException(" Email not found from OAuth2 provider");//여기구나 
        }

        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
        User user;
        System.out.println("CustomOAuth2UserService processOAuth2User "+userOptional);
        if(userOptional.isPresent()) {  // 이미 가입되어져 있다면 
            user = userOptional.get();
            System.out.println("isPresent"+ user);
            if(!user.getProvider().equals(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
            	System.out.println(user.getProvider()); // google
            	System.out.println(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))  ;// naver
            	//naver false 
                throw new OAuth2AuthenticationProcessingException("HERE Looks like you're signed up with " +
                        user.getProvider() + " account. Please use your " + user.getProvider() +
                        " account to login.");
            }
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }
//새로운 유저정보 저장 
    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        User user = new User();
        System.out.println("registerNewUser 부분 새로운 유저정보 ");
        user.setProvider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        user.setProviderId(oAuth2UserInfo.getId());
        user.setName(oAuth2UserInfo.getName());
        user.setEmail(oAuth2UserInfo.getEmail());
        user.setCreateDate(LocalDateTime.now());
        user.setUpdateDate(LocalDateTime.now());
        return userRepository.save(user);
    }
//업데이트 ouath 유저 
    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setName(oAuth2UserInfo.getName());
        System.out.println("updateExistingUser 부분 업데이트  유저정보 ");
        return userRepository.save(existingUser);
    }
}

