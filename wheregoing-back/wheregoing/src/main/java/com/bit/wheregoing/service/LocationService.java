package com.bit.wheregoing.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bit.wheregoing.model.CityList;
import com.bit.wheregoing.repository.CityListRepository;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@Service
//@AllArgsConstructor
//@RequiredArgsConstructor
public class LocationService {

	
//	private final CityList cityList;
	@Autowired
	private  CityListRepository cityListRepository;
	
	
	public List<CityList> CityFindAll() {
		return cityListRepository.findAll();
	}
}
