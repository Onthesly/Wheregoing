package com.bit.wheregoing.controller;



import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bit.wheregoing.payload.TestResponse;
import com.bit.wheregoing.model.Hotels;
import com.bit.wheregoing.model.Location;
import com.bit.wheregoing.model.Startpoint;
import com.bit.wheregoing.model.TouristAttraction;
import com.bit.wheregoing.service.IndexToCity;
import com.bit.wheregoing.service.TestService;


@CrossOrigin
@RestController
public class TestController {
	
	
	@Autowired
	TestService testservice;
	
	@Autowired
	IndexToCity indexToCity;
	
	
	@GetMapping()
	public String index() {
		
		return "test/main";
	}
	
	@GetMapping("/city")
	public ResponseEntity<?> citySeoul(Model model, @RequestParam("city") String city) {
		List<TouristAttraction> list = indexToCity.touristAttractionList(city);
		List<Hotels> hotelList = indexToCity.hotelsList(city);
		Startpoint startpoint = indexToCity.setStartPoint(city);
		TestResponse<?> response = TestResponse.builder().hotels(hotelList).touristAttraction(list).startpoint(startpoint).build();
		return ResponseEntity.ok().body(response);
	}

	@RequestMapping("/newmap-result")
	public ResponseEntity<?> result(Location location, Model model,int days,String city,String timeList) {
		
//		String locations=location.getLocations();
//		String hotels=location.getHotels();
		//System.out.println(locations);
		
////		System.out.println(hotels);
////		System.out.println("-------");
////		System.out.println(days);
////		System.out.println("-------");
//		System.out.println(city);
////		System.out.println(timeList);
		
		System.out.println("�꽆�뼱�삩�룄�떆媛�");
		System.out.println(location.getCity());
		System.out.println("�꽆�뼱�삩�쐞移�");
		System.out.println(location.getLocations());
		System.out.println("�꽆�뼱�삩�샇�뀛");
		System.out.println(location.getHotels());
		System.out.println("�꽆�뼱�삩�씪�젙�씪�닔");
		System.out.println(days);
		System.out.println("�꽆�뼱�삩�룄�떆媛�");
		System.out.println(city);
		System.out.println("�꽆�뼱�삩�씪�젙�떆媛�");
		System.out.println(timeList);
		
		

		
		List<List<Location>> dayslist = testservice.wg(days, location.getCity(), location.getLocations(), location.getHotels(),timeList);
		
		List<String> returnList = new ArrayList<String>();
		
		for(int i=0;i<dayslist.size();i++) {
		System.out.println(i+"諛뺤감");
		
		String listString="";
		
		for(int j=0;j<(dayslist.get(i)).size();j++) {
			System.out.println(((Location) dayslist.get(i).get(j)).getLocations());
			listString += (dayslist.get(i).get(j)).getName();
			if(j!=dayslist.get(i).size()-1) {
				listString +=",";
			}
		}
		returnList.add(listString);
		System.out.println(listString);
		}
		
		String hypenString="";
		for(int i=0;i<returnList.size();i++) {
			hypenString+=returnList.get(i);
			hypenString+="-";
		}
		
		
		
		
//		
//
//
//		List<TouristAttraction> list = indexToCity.touristAttractionList(city);
//		List<Hotels> hotelList = indexToCity.hotelsList(city);
//		Startpoint startpoint = indexToCity.setStartPoint(city);
//		
//		System.out.println("12345");
//		
//		
//		model.addAttribute("list",list);
//		System.out.println(list);
//		model.addAttribute("hotelList",hotelList);
//		System.out.println(hotelList);
//		model.addAttribute("startpoint",startpoint);
//		System.out.println(startpoint);
//		model.addAttribute("dayPlan",dayslist);
//		System.out.println(dayslist);


//		return "test/mapresult";
		TestResponse<?> response = TestResponse.builder().daysList(dayslist).daysString(returnList).hypenString(hypenString).build();
		return ResponseEntity.ok().body(response);
	}
	
	@RequestMapping("/planSave")
	public ResponseEntity<?> planSave(String dataKr,String title,String city,Long userid) {
		System.out.println(dataKr);
		System.out.println(title);
		System.out.println(city);
		System.out.println(userid);
		testservice.savePlan(dataKr,title,city,userid);
		
		
		
		return ResponseEntity.ok().body(null);
		
	}
	
}
