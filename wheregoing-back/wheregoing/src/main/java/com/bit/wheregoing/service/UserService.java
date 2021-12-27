package com.bit.wheregoing.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bit.wheregoing.model.User;
import com.bit.wheregoing.payload.UserUpdateNameRequestDto;
import com.bit.wheregoing.payload.UserUpdatePasswordRequestDto;
import com.bit.wheregoing.payload.UserUpdateRequestDto;
import com.bit.wheregoing.repository.UserRepository;

import lombok.RequiredArgsConstructor;

//@RequiredArgsConstructor
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    

    
    @Transactional
    public int Userdelete(Long id) {
    	Optional<User> userEntity = userRepository.findById(id);
    	if(userEntity.isPresent()) {
    		userRepository.delete(userEntity.get());
    		System.out.println("유저 삭제 ");
    		return 1;
    	}else {
    		System.out.println("유저 삭제 실패");
    		return 0;
    	}
    }
    // 회원 수정 우선 이름과 비밀번호만 
    @Transactional
    public User UserUpdate(UserUpdateRequestDto userUpdateRequest) {
    	
    	Optional<User> userEntity = userRepository.findById(userUpdateRequest.getUserid());
    	User user = null;
    	if(userEntity.isPresent()) {
    		user = userEntity.get();
    		user.setName(userUpdateRequest.getUsername());
    		String changepassword=userUpdateRequest.getPassword();
    		user.setPassword(passwordEncoder.encode(changepassword));
    		user.setUpdateDate(LocalDateTime.now());	
    		
    	}else {
        	System.out.println("회원 정보 없습니다. ");
        }
    	System.out.println("회원구정 부분 유저 id"+ user.getId());
    	return user;
    }
    @Transactional
    public User UserUpdateName(UserUpdateNameRequestDto userUpdateRequestName) {
    	
    	Optional<User> userEntity = userRepository.findById(userUpdateRequestName.getUserid());
    	User user = null;
    	if(userEntity.isPresent()) {
    		user = userEntity.get();
    		user.setName(userUpdateRequestName.getUsername());
    		user.setUpdateDate(LocalDateTime.now());	
    		
    	}else {
        	System.out.println("회원 정보 없습니다. ");
        }
    	System.out.println("회원이름정 부분 유저 id"+ user.getId());
    	return user;
    }
    
    @Transactional
    public User UserUpdatePassword(UserUpdatePasswordRequestDto userUpdatePasswordRequestDto) {
    	Optional<User> userEntity = userRepository.findById(userUpdatePasswordRequestDto.getUserid());
    	User user = null;
    	if(userEntity.isPresent()) {
    		user = userEntity.get();
    		user.setPassword(passwordEncoder.encode(userUpdatePasswordRequestDto.getPassword()));
    		user.setUpdateDate(LocalDateTime.now());	
    		
    	}else {
        	System.out.println("회원 정보 없습니다. ");
        }
    	System.out.println("회원이름정 부분 유저 id"+ user.getId());
    	return user;
    }
}
