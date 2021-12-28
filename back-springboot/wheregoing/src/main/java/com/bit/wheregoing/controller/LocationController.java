package com.bit.wheregoing.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bit.wheregoing.model.CityList;
import com.bit.wheregoing.repository.CityListRepository;
import com.bit.wheregoing.service.LocationService;

@CrossOrigin
@RestController
@RequestMapping("/location")
public class LocationController {
	
	
	@Autowired 
	private LocationService locationService;
	
	@GetMapping("/all")
	public ResponseEntity<?> FindAllCity(){
		List<CityList> list = locationService.CityFindAll();
		return ResponseEntity.ok().body(list);
	}
	
}
