package com.bit.wheregoing.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bit.wheregoing.model.TouristAttraction;

public interface TouristAttractionRepository extends JpaRepository<TouristAttraction,Integer> {

	TouristAttraction findByCode(String code);
	
	List<TouristAttraction> findAllByCity(String city);
	
}
