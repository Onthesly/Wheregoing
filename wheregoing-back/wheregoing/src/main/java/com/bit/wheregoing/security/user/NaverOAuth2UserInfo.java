package com.bit.wheregoing.security.user;
import java.util.Map;

public class NaverOAuth2UserInfo extends OAuth2UserInfo {
    public NaverOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
        System.out.println(attributes);
    }

    @Override
    public String getId() {
    	
    	 Map<String, Object> response = (Map<String, Object>) attributes.get("response");
    	 System.out.println("네이버 getId"+(String) response.get("id"));
        return (String) response.get("id"); // 애를 찾을 수 없다? 
//    	  return String.valueOf(attributes.get("id"));
//        return (String)attributes.get("id");
    }

    @Override
    public String getName() {
    	System.out.println("네이버 getName");
    	Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        return (String) response.get("name");
//    	return (String)attributes.get("name");
    }

    @Override
    public String getEmail() {
    	System.out.println("네이버 getEmail");
    	Map<String, Object> response = (Map<String, Object>) attributes.get("response");
    	System.out.println((String)response.get("email"));
        return (String) response.get("email");
//    	return (String)attributes.get("email");
    }

    @Override
    public String getImageUrl() {
    	System.out.println("네이버 getImageUrl");
    	Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        return (String) response.get("profile_image");
    }
}