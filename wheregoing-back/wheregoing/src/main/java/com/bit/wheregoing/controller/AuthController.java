package com.bit.wheregoing.controller;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.bit.wheregoing.exception.BadRequestException;
import com.bit.wheregoing.model.AuthProvider;
import com.bit.wheregoing.model.User;
import com.bit.wheregoing.payload.ApiResponse;
import com.bit.wheregoing.payload.AuthResponse;
import com.bit.wheregoing.payload.OuathResponse;
import com.bit.wheregoing.payload.LoginRequest;
import com.bit.wheregoing.payload.SignUpRequest;
import com.bit.wheregoing.repository.UserRepository;
import com.bit.wheregoing.security.TokenProvider;
import com.bit.wheregoing.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenProvider tokenProvider; // jwt utill 
    
    // ouath 로그인 유저정보를 토큰만 보이네 따로 만들기 
    // 아이디 중복 하나 보내 
    @PostMapping("/login/oauth")
    public ResponseEntity<?> OauthUserLogin(@Valid @RequestBody String token){
    	String tokenn = token.substring(1);
    	String tokennn = tokenn.substring(0,tokenn.length()-1);
    	System.out.println(tokennn);
    	Long userid = tokenProvider.getUserIdFromToken(tokennn); 
    	System.out.println("토큰으로 유저 아이디 찾기 "+userid);
    	boolean emailexist;
    	if( userRepository.existsById(userid)) {
    		System.out.println("아이디 존재 ");
    		emailexist=true;
    	} else {
    		emailexist=false;
    	}
    	
        String username=" ";
        String email=" ";
        String password = " ";
//        AuthProvider provider;
        boolean loginstate = false;
        String oauthstate = "";
    	User user;
        Optional<User> userOptional = userRepository.findById(userid);
        if(userOptional.isPresent()) {
        	System.out.println("유저 찾기 2");
        	user = userOptional.get();
        	userid = user.getId();
        	username = user.getName();
        	email = user.getEmail();
        	password = user.getPassword();
        	loginstate = true;
        	oauthstate = user.getProvider().toString();
        	System.out.println("oauthstate " + oauthstate );
        	
        }else {
        	System.out.println("user 못가지고 옴");
        }
        System.out.println("loging 부분 " + emailexist);
//        return ResponseEntity.ok(new AuthResponse(token , userid , username , email)); // 리스폰스 토큰 생성한 거랑 id name 이메일 같이 넘겨야함
//        return ResponseEntity.ok().body("id find ");
        return ResponseEntity.ok().body(new OuathResponse(tokennn , userid , username , email, loginstate , oauthstate, emailexist));
    	
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    	System.out.println("login "+loginRequest.getEmail());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );//new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
// userdetails 
        // 이메일을 통해 아이디 찾기
     Long userid = 0L;
     String username=" ";
     String email=" ";
     boolean loginstate = false;
     String oauthstate = "";
       User user;
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
        if(userOptional.isPresent()) {
        	user = userOptional.get();
        	System.out.println(" 로그인 부분 isPresent 이메일 "+ user.getEmail());
        	System.out.println(" 로그인 부분 isPresent 이름"+ user.getName());
        	userid = user.getId();
        	username = user.getName();
        	email = user.getEmail();
        	loginstate = true;
        	oauthstate = "local";
        	
        	System.out.println(oauthstate);
        }else {
        	System.out.println("user 못가지고 옴");
        }
        
//        System.out.println("user 아이디"+user.getId());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        System.out.println("loging 부분");
        String token = tokenProvider.createToken(authentication); // 토큰 생성하여 저장 
        System.out.println("token"+ token);
//        System.out.println("login AuthResponse "+new AuthResponse(token));
        
//        return ResponseEntity.ok(new AuthResponse(token , userid , username , email)); // 리스폰스 토큰 생성한 거랑 id name 이메일 같이 넘겨야함
//        return ResponseEntity.ok().body("id find ");
        return ResponseEntity.ok().body(new AuthResponse(token , userid , username , email, loginstate, oauthstate));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
    	System.out.println("회원가입 이메일 확인용"+ signUpRequest.getEmail());
        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
        	System.out.println("existsByEmail 이메일 존재 " );
            throw new BadRequestException("Email address already in use.");  // 이메일 중복 // 닉네임도 중복검사 해야될듯 
        }
        if (userRepository.existsByName(signUpRequest.getName())) {
        	System.out.println("existsByName 이름 존재 " );
			return ResponseEntity
					.badRequest()
					.body(new BadRequestException("Error: Username is already taken!"));
		}
        System.out.println("signup 진입 ");
        // Creating user's account
        User user = User.builder()
        		.name(signUpRequest.getName())
        		.email(signUpRequest.getEmail())
        		.password(passwordEncoder.encode(signUpRequest.getPassword()))
        		.provider(AuthProvider.local)
        		.createDate(LocalDateTime.now())
        		.updateDate(LocalDateTime.now())
        		.emailVerified(false)
        		.build();
//        User user = new User();
//        user.setName(signUpRequest.getName());
//        user.setEmail(signUpRequest.getEmail());
//        user.setPassword(signUpRequest.getPassword());
//        user.setProvider(AuthProvider.local);
//
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        
        User result = userRepository.save(user);
        // 애인거  
        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user/me")
                .buildAndExpand(result.getId()).toUri();
        System.out.println("singup 부분");
//        return ResponseEntity.created(location)
//                .body(new ApiResponse(true, "User registered successfully@"));
        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "User registered successfully@"));
    }
    // 이메일 중복검사 
    @PostMapping("/useremailvalid")
    public ResponseEntity<?> useremailValid(@Valid @RequestBody String email){
    	String emaill = email.substring(1);
    	String emailll = emaill.substring(0,emaill.length()-1);
    	System.out.println("이메일 중복 검사 "+email);
    	 if(userRepository.existsByEmail(emailll)) {
         	System.out.println("existsByEmail 이메일 존재 " );
             return ResponseEntity.ok().body(new BadRequestException("Error: existsByEmail")); // 이메일 중복 // 닉네임도 중복검사 해야될듯 
         }else {
        	 return ResponseEntity.ok().body(new BadRequestException("not existsEmail"));
    	}
    }
    // 이름 중복 검사 
    @PostMapping("/usernamevalid")
    public ResponseEntity<?> usernameValid(@Valid @RequestBody String name){
    	String namee = name.substring(1);
    	String nameee = namee.substring(0,namee.length()-1);
    	System.out.println("이름 중복 검사 "+nameee);
    	 if(userRepository.existsByName(nameee)) {
         	System.out.println("existsByName 아름 존재 " );
             return ResponseEntity.ok().body(new BadRequestException("Error: existsByName")); // 이메일 중복 // 닉네임도 중복검사 해야될듯 
         }else {
        	 return ResponseEntity.ok().body(new BadRequestException("not existsName"));
    	}
    }
    
}
