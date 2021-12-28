package com.bit.wheregoing.payload;

import java.util.List;

// 토큰  토큰 타입 jwt response 타입 

//public class AuthResponse {
//    private String accessToken;
//    private String tokenType = "Bearer";
//
//    public AuthResponse(String accessToken) {
//        this.accessToken = accessToken;
//    }
//
//    public String getAccessToken() {
//        return accessToken;
//    }
//
//    public void setAccessToken(String accessToken) {
//        this.accessToken = accessToken;
//    }
//
//    public String getTokenType() {
//        return tokenType;
//    }
//
//    public void setTokenType(String tokenType) {
//        this.tokenType = tokenType;
//    }
//}

public class OuathResponse {
	private String token;
	private String type = "Bearer";
	private Long id;
	private String username;
	private String email;
	private boolean emailexist;

	private boolean loginstate;
	private String oauthstate;
	
	public OuathResponse(String accessToken, Long id, String username, String email,boolean loginstate , String oauthstate,boolean emailexist) {
		this.token = accessToken;
		this.id = id;
		this.username = username;
		this.email = email;
		this.loginstate = loginstate;
		this.oauthstate = oauthstate;
		this.emailexist = emailexist;
	}
	//	private List<String> roles;
	public OuathResponse(String accessToken, Long id, String username, String email) {
		this.token = accessToken;
		this.id = id;
		this.username = username;
		this.email = email;
		
//		this.roles = roles;
	}
	public boolean isEmailexist() {
		return emailexist;
	}
	public void setEmailexist(boolean emailexist) {
		this.emailexist = emailexist;
	}
	public OuathResponse(String accessToken) {
		this.token = accessToken;
	}
	public boolean isLoginstate() {
		return loginstate;
	}
	public void setLoginstate(boolean loginstate) {
		this.loginstate = loginstate;
	}
	public String getOauthstate() {
		return oauthstate;
	}
	public void setOauthsta(String oauthsta) {
		this.oauthstate = oauthsta;
	}

	public String getAccessToken() {
		return token;
	}

	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
//
//	public List<String> getRoles() {
//		return roles;
//	}
}