package com.bit.wheregoing.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bit.wheregoing.model.MyPlans;
import com.bit.wheregoing.repository.MyPlansRepository;

import lombok.RequiredArgsConstructor;


@Service
public class MyPlansService {
 
	@Autowired
	private MyPlansRepository myPlansRepository;
	
	@Transactional
	public List<MyPlans> findMyplanAll(Long userid){		
		return myPlansRepository.findByUserid(userid); 
	}
	
	@Transactional
	public MyPlans FindMyPlan(Long myplanid, Long userid) {
		return myPlansRepository.findByMyplansidAndUserid(myplanid, userid);
	}
}
