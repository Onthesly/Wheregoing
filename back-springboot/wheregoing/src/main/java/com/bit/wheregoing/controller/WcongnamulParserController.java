package com.bit.wheregoing.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bit.wheregoing.model.Hotels;
import com.bit.wheregoing.model.Startpoint;
import com.bit.wheregoing.model.TouristAttraction;
import com.bit.wheregoing.service.IndexToCity;


@Controller
public class WcongnamulParserController {
	
	@Autowired
	IndexToCity indexToCity; // db 들고  
	
	
	
	@RequestMapping("wcongnamaul")
	public String WcongnamulParser(Model model,String city) {
		
		List<TouristAttraction> list = indexToCity.touristAttractionList(city);
		List<Hotels> hotelList = indexToCity.hotelsList(city);
		Startpoint startpoint = indexToCity.setStartPoint(city);
		// jstl 
		model.addAttribute("list",list);
		model.addAttribute("hotelList",hotelList);
		model.addAttribute("startpoint",startpoint);
		
		System.out.println(list.get(0).getCode());
		System.out.println(hotelList.get(0).getCode());
		
		
		return "test/util/wcongnamulparser";
	}
}
