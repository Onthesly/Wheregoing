package com.bit.wheregoing.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bit.wheregoing.model.Startpoint;
//import org.springframework.data.jpa.repository.Query;



public interface StartpointRepository extends JpaRepository<Startpoint, Integer> {
	
	
//	@Query(value="SELECT * FROM startpoint where city = ?1",nativeQuery = true)
	Startpoint findByCity(String city);
	
}
