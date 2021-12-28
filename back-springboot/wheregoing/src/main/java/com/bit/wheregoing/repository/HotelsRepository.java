package com.bit.wheregoing.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bit.wheregoing.model.Hotels;



public interface HotelsRepository extends JpaRepository<Hotels, Integer> {

	Hotels findByCodeAndCity(String code,String city);
	
	List<Hotels> findAllByCity(String city);
	// 계속 추가 될꺼 
	
}
