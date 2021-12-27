package com.bit.wheregoing.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bit.wheregoing.model.Location;
import com.bit.wheregoing.model.MyPlans;
import com.bit.wheregoing.model.User;
import com.bit.wheregoing.payload.MyPlansDetailRequest;
import com.bit.wheregoing.payload.MyPlansRequest;
import com.bit.wheregoing.repository.MyPlansRepository;
import com.bit.wheregoing.repository.UserRepository;
import com.bit.wheregoing.service.MyPlansService;
import com.bit.wheregoing.service.UserService;

@CrossOrigin
@RestController

public class MyPlansController {
	@Autowired
	private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
	private MyPlansService myPlansService;
    
    @Autowired 
    private MyPlansRepository myPlansRepository;
    
    
   @PostMapping("/mypage/delete")
   public ResponseEntity<?> plandelete(@Valid @RequestBody MyPlansDetailRequest myPlansDetailRequest){
	   
	   System.out.println(myPlansDetailRequest.getMyplantitle());
	   System.out.println("Myplansid  " +myPlansDetailRequest.getMyplansid());
	   System.out.println("userid  "+myPlansDetailRequest.getUserid());
	   MyPlans myplan = myPlansService.FindMyPlan(myPlansDetailRequest.getMyplansid(), myPlansDetailRequest.getUserid());
	   System.out.println("myplan"+ myplan.getMyplansid());
	   myPlansRepository.delete(myplan);
	   return ResponseEntity.ok().body(myplan.getMyplantitle());
   }
    
    // 유저 mypage 일정들 띄울 꺼
    @PostMapping("/mypage")
    public ResponseEntity<?> planAll(@Valid @RequestBody MyPlansRequest  myPlansRequest){

    	System.out.println(myPlansRequest.getUserid());
    	System.out.println(myPlansRequest.getEmail());
    	Optional<User> userOptional = userRepository.findByEmail(myPlansRequest.getEmail());
    	
    	if(userOptional.isPresent()) {
    		System.out.println(myPlansService.findMyplanAll(myPlansRequest.getUserid()).get(0).getMyplan());
    		List<MyPlans> test = myPlansService.findMyplanAll(myPlansRequest.getUserid());
    		
    		List<String> returnList = new ArrayList<String>(); //길이가 일(日)자인 리스트를 만든다.		
    		return ResponseEntity.ok().body(myPlansService.findMyplanAll(myPlansRequest.getUserid()));
    		
    	}
    	else {
    		return ResponseEntity.badRequest().body("이메일 확인 실패");
    	}
    }
}
