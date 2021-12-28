package com.bit.wheregoing.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bit.wheregoing.model.Hotels;
import com.bit.wheregoing.model.Startpoint;
import com.bit.wheregoing.model.TouristAttraction;
import com.bit.wheregoing.payload.TestResponse;
import com.bit.wheregoing.service.IndexToCity;

@CrossOrigin
@RestController
@RequestMapping("/city")
public class WcongnamulParserController2 {
	
	@Autowired
	IndexToCity indexToCity; // db 들고  
	
	@GetMapping("/all")
	public ResponseEntity<?> hotelFindAll(){
		System.out.println("모두찾기");
		List<Hotels> hotelList = indexToCity.hotelsList1();

		
		return ResponseEntity.ok().body(hotelList); //  
	}
	
//	@PostMapping("/all2")
//	public ResponseEntity<?> hotelFindAll2 (@Valid @RequestBody String city){
//		System.out.println(city);// "city"  city 
//		String tokenn = city.substring(1);
//    	String tokennn = tokenn.substring(0,tokenn.length()-1);
//    	System.out.println(tokennn);
//    	
//		List<TouristAttraction> list = indexToCity.touristAttractionList(tokennn);
//		List<Hotels> hotelList = indexToCity.hotelsList(tokennn);
//		Startpoint startpoint = indexToCity.setStartPoint(tokennn);
//		
//		
////		List<Startpoint> startpointList = new ArrayList<Startpoint>();
////		startpointList.add(startpoint);
////		List<List> totalList =new ArrayList<List>();
////		totalList.add(hotelList);
////		totalList.add(startpointList);
////		totalList.add(list);
//
//		
//		return ResponseEntity.ok().body(new TestResponse(hotelList, list, startpoint)); //  
//	}
	
	
	@GetMapping("wcongnamaul2")
	public String WcongnamulParser(Model model,String city) {
		
		List<TouristAttraction> list = indexToCity.touristAttractionList(city);
		List<Hotels> hotelList = indexToCity.hotelsList(city);
		Startpoint startpoint = indexToCity.setStartPoint(city);
		// jstl 
		model.addAttribute("list",list);
		model.addAttribute("hotelList",hotelList);
		model.addAttribute("startpoint",startpoint);
		//list 2  그냥 값 1 
		 
		System.out.println(list.get(0).getCode());
		System.out.println(hotelList.get(0).getCode());
		
		
		return "test/util/wcongnamulparser";
	}
}
