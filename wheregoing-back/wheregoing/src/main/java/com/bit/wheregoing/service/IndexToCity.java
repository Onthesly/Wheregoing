package com.bit.wheregoing.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bit.wheregoing.model.Hotels;
import com.bit.wheregoing.model.Startpoint;
import com.bit.wheregoing.model.TouristAttraction;
import com.bit.wheregoing.repository.HotelsRepository;
import com.bit.wheregoing.repository.StartpointRepository;
import com.bit.wheregoing.repository.TouristAttractionRepository;

@Service
public class IndexToCity {
	@Autowired
	private TouristAttractionRepository touristAttractionRepository;
	
	@Autowired
	private HotelsRepository hotelsRepository;
	
	@Autowired
	private StartpointRepository startpointRepository;
	
	@Transactional
	public List<Hotels>  hotelsList1 (){
		List<Hotels> list = hotelsRepository.findAll();
		return list;
	}
	@Transactional
	public List<TouristAttraction> touristAttractionList(String city) {
		List<TouristAttraction> list= touristAttractionRepository.findAllByCity(city);
		return list;
	}
	@Transactional
	public List<Hotels> hotelsList(String city) {
		List<Hotels> list = hotelsRepository.findAllByCity(city);
		return list;
	}
	
	@Transactional
	public Startpoint setStartPoint(String city) {
		Startpoint startpoint = startpointRepository.findByCity(city);
		
		return startpoint;
	}
	
}
