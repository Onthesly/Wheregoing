package com.bit.wheregoing.controller;

import java.util.HashMap;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bit.wheregoing.exception.BadRequestException;
import com.bit.wheregoing.exception.ResourceNotFoundException;
import com.bit.wheregoing.model.User;
import com.bit.wheregoing.payload.MyPlansRequest;
import com.bit.wheregoing.payload.UserUpdateNameRequestDto;
import com.bit.wheregoing.payload.UserUpdatePasswordRequestDto;
import com.bit.wheregoing.payload.UserUpdateRequestDto;
import com.bit.wheregoing.repository.UserRepository;
import com.bit.wheregoing.security.CurrentUser;
import com.bit.wheregoing.security.UserPrincipal;
import com.bit.wheregoing.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService userService;
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
   
    // 유저 mypage 일정들 띄울 꺼
    @PostMapping("/mypage")
    public ResponseEntity<?> planAll(@Valid @RequestBody Long id ){
    	System.out.println(id);
//    	System.out.println(email);
//    	System.out.println(myPlansRequest.getId());
//    	System.out.println(myPlansRequest.getEmail());
//    	Optional<User> userOptional = userRepository.findByEmail(email);
    	
//    	if(userOptional.isPresent()) {
    		return ResponseEntity.ok().body("이메일 확인 성공");
    		
//    	}
//    	else {
//    		return ResponseEntity.badRequest().body("이메일 확인 실패");
//    	}
    }
    
    
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@Valid @RequestBody Long id){
//    	System.out.println("회원 삭제 id " + map.get("id") );
//    	Long id = Long.parseLong( map);
    	System.out.println("회원 삭제 id " +id );
    	int delete = userService.Userdelete(id);
    	System.out.println("detele 유무 " + delete );
    	if (delete == 1) {
    		return ResponseEntity.ok().body("succes delete");    		
    	}
    	else {
    		return ResponseEntity
			.badRequest()
			.body(new BadRequestException("Error: delete fail!"));
    	}
    }
    
    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@Valid @RequestBody UserUpdateRequestDto userUpdateRequestDto){
    	System.out.println(userUpdateRequestDto.getUserid());
    	System.out.println(userUpdateRequestDto.getUsername());
    	User user = userService.UserUpdate(userUpdateRequestDto);
    
    	User result = userRepository.save(user);
//    	System.out.println("update put"+user.getEmail());
//    	return ResponseEntity.ok().body("userUpdate success");
    	return ResponseEntity.ok().body("succes update");
    }
    @PutMapping("/updatename")
    public ResponseEntity<?> updateUserName(@Valid @RequestBody UserUpdateNameRequestDto userUpdateNameRequestDto){
    	System.out.println(userUpdateNameRequestDto.getUserid());
    	System.out.println(userUpdateNameRequestDto.getUsername());
    	User user = userService.UserUpdateName(userUpdateNameRequestDto);
    
    	User result = userRepository.save(user);
//    	System.out.println("update put"+user.getEmail());
//    	return ResponseEntity.ok().body("userUpdate success");
    	return ResponseEntity.ok().body("succes update");
    }
    @PostMapping("/updatepassword")
    public ResponseEntity<?> updateUserPassword(@Valid @RequestBody UserUpdatePasswordRequestDto userUpdatePasswordRequestDto){
    	System.out.println(userUpdatePasswordRequestDto.getUserid());
    	System.out.println(userUpdatePasswordRequestDto.getUseremail());
    	System.out.println(userUpdatePasswordRequestDto.getPassword());
    	// 여기다가 맞는지 아닌지 
    	Optional<User> password = userRepository.findById(userUpdatePasswordRequestDto.getUserid());
    	User user = password.get();
//    	(user.getPassword())
    	// 패스워드 같으면
    	if(passwordEncoder.matches(userUpdatePasswordRequestDto.getPassword(), user.getPassword())) {
    		System.out.println("패스워드 일치여부 동일한 비밀번호 ");
    		return ResponseEntity.badRequest().body("bad");
    	}
    	// 다르면 
    	else if(!passwordEncoder.matches(userUpdatePasswordRequestDto.getPassword(), user.getPassword())) {
    		System.out.println("동일하지 않음 ");
//    	System.out.println("update put"+user.getEmail());
//    	return ResponseEntity.ok().body("userUpdate success");
    		
    	}
    	User users = userService.UserUpdatePassword(userUpdatePasswordRequestDto);
    	User result = userRepository.save(users);
    	return ResponseEntity.ok().body("succes update");

    	
    }
    
   

	@GetMapping("me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
    	System.out.println("user/me 부분");
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
}