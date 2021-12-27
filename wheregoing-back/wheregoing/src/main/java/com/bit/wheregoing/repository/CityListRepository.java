package com.bit.wheregoing.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bit.wheregoing.model.CityList;

@Repository
public interface CityListRepository extends JpaRepository<CityList, Integer>{

	CityList findByCitynamee(String city) ;

		

//	List<CityList> findAll();
	
}
