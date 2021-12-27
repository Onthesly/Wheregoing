package com.bit.wheregoing.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bit.wheregoing.model.MyPlans;


public interface MyPlansRepository extends JpaRepository<MyPlans, Long>{
//	MyPlans findByUserid(Long userid);
	//한건찾기
	MyPlans findByMyplansidAndUserid(Long myplasnsid,Long userid);
	List<MyPlans> findByUserid(Long userid);
	
	Boolean existsByUserid(Long userid);
	
	
}
