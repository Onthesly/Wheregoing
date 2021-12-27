package com.bit.wheregoing.security;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.bit.wheregoing.config.AppProperties;
import io.jsonwebtoken.*;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoder;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

// JWT UTIl 

@Service
public class TokenProvider implements InitializingBean{

    private static final Logger logger = LoggerFactory.getLogger(TokenProvider.class);
    
    
	@Value("${app.auth.tokenSecret}")
	private String jwtSecret;
	@Value("${app.auth.tokenExpirationMsec}")
	private int jwtExpirationMs;
//	@Value("${bezkoder.app.jwtSecret}")
//	private String jwtSecret;
//tokenExpirationMsec
//	@Value("${bezkoder.app.jwtExpirationMs}")
//	private int jwtExpirationMs;
    private AppProperties appProperties;
    private Key key;
//    public TokenProvider(@Value("${app.auth.tokenSecret}") String secretKey) {
//        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
//        this.key = Keys.hmacShaKeyFor(keyBytes);
//    }
    public TokenProvider(AppProperties appProperties) {
        this.appProperties = appProperties;
    }
    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }
    
    //  추가 jWT signature does not match locally computed signature. JWT validity cannot be asserted and should not be trusted
//    byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
//    Key key = Keys.hmacShaKeyFor(keyBytes);
    
// 토큰 생성. 
    public String createToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        System.out.println("createToken"+key);
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() +jwtExpirationMs); //tokenExpirationMsec: 864000000
		System.out.println("토큰 생성  ");
		return Jwts.builder()
		        .setSubject(Long.toString(userPrincipal.getId()))
		        .setIssuedAt(now)
		        .setExpiration(expiryDate)
		        .signWith(key)//, SignatureAlgorithm.HS512
		        .compact();
//        return Jwts.builder()
//                .setSubject(Long.toString(userPrincipal.getId()))
//                .setIssuedAt(new Date())
//                .setExpiration(expiryDate)
//                .signWith(SignatureAlgorithm.HS512, appProperties.getAuth().getTokenSecret())
//                .compact();
    }
// 
//    public String getUserNameFromJwtToken(String token) {
//		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
//	}
    //
    public Long findUserIdFromToken(String token) {
    	System.out.println("getTokenSecret1 : " + token);
    	 System.out.println("findUserIdFromToken"+key);
    	// claims 부분 버전dptj 이걸 사용하지 않는 다 
//                .setSigningKey(appProperties.getAuth().getTokenSecret().getBytes()).build()
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key).build()
                .parseClaimsJws(token)
                .getBody();
//        System.out.println("getTokenSecret2 : " + appProperties.getAuth().getTokenSecret());
        System.out.println("getTokenSecret3 Long : " + Long.parseLong(claims.getSubject()));
        return Long.parseLong(claims.getSubject());
    }
    public Long getUserIdFromToken(String token) {  
//    	System.out.println("getTokenSecret1 : " + appProperties.getAuth().getTokenSecret());
    	System.out.println("getTokenSecret1 : " + token);
    	// claims 부분 버전dptj 이걸 사용하지 않는 다 
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key).build()
//                .setSigningKey(appProperties.getAuth().getTokenSecret().getBytes()).build()
                .parseClaimsJws(token)
                .getBody();
//        System.out.println("getTokenSecret2 : " + appProperties.getAuth().getTokenSecret());
        System.out.println("getTokenSecret3 Long : " + Long.parseLong(claims.getSubject()));
        return Long.parseLong(claims.getSubject());
    }
// 
    public boolean validateToken(String authToken) {
        try {
        	Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(authToken);
//            Jwts.parserBuilder().setSigningKey(appProperties.getAuth().getTokenSecret()).build().parseClaimsJws(authToken);
            System.out.println("valid 성공");
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException ex) {
            logger.error("Invalid JWT signature", ex.getMessage());
        } 
//            catch (MalformedJwtException ex) {
//            logger.error("Invalid JWT token" ,ex.getMessage());
//        } 
        catch (ExpiredJwtException ex) {
            logger.error("Expired JWT token",ex.getMessage());
        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT token",ex.getMessage());
        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string is empty.",ex.getMessage());
        }
        System.out.println("valid2");
        return false;
    }

}

