package com.bit.wheregoing.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.bit.wheregoing.model.CityList;
import com.bit.wheregoing.model.Hotels;
import com.bit.wheregoing.model.Location;
import com.bit.wheregoing.model.MyPlans;
import com.bit.wheregoing.model.Startpoint;
import com.bit.wheregoing.model.TouristAttraction;
import com.bit.wheregoing.repository.CityListRepository;
import com.bit.wheregoing.repository.HotelsRepository;
import com.bit.wheregoing.repository.MyPlansRepository;
import com.bit.wheregoing.repository.StartpointRepository;
import com.bit.wheregoing.repository.TouristAttractionRepository;


@Service
public class TestService {
	
	@Autowired
	private HotelsRepository hotelsRepository;
	
	@Autowired
	private TouristAttractionRepository touristAttractionRepository;
	
	@Autowired
	private StartpointRepository startpointRepository;
	
	@Autowired
	private MyPlansRepository myPlansRepository;
	
	@Autowired
	private CityListRepository cityListRepository;
	
	//두점사이의거리
	public static double twoPointDistance(Location location, Location location2) {
		double a_lat=location.getLat();
		double a_lng=location.getLng();
		double b_lat=location2.getLat();
		double b_lng=location2.getLng();
		
		double distance = Math.sqrt(Math.pow((a_lat-b_lat),2)+Math.pow((a_lng-b_lng),2));
		return distance;
	}
	
	
	
	public List<List<Location>> wg(int days, String city,String locations,String hotels, String timeList) {
		//days->몇일을 받을것인가? 
		//city->서울고정일것이다.
		//locations->컴마로 구분된 스트링으로 위치들이 적혀있음
		//hotels->컴마로 구분된 스트링으로 호텔 위치들이 적혀있음.
		double distance = standardDistance(city); //일단서울세팅. 실제에선 다르게 받으면 되겠지? 값은 임시적으로 0.05로 잡음.
		
		//넘어온 timeList는 "시간1,시간2,시간3,시간4..." 형태
		String[] time=timeList.split(",");
		//따라서 ["시간1","시간2","시간3","시간4"..] 형태로 바꾼 뒤
		Double[] timeArray = new Double[time.length];
		//Double로 형변환.
		for(int i=0;i<time.length;i++) {
			timeArray[i]=Double.parseDouble(time[i]);
		}
		//예를들어 i일의 잔여 시간은 =>daysList.get(i)의 잔여시간은timeArray[i]와 같다. 
		System.out.println("데이즈는"+days);

		//토탈 일정을 관리할 리스트를 뽑음.
		List<List<Location>> dayslist = new ArrayList<List<Location>>();
		//토탈 일정을 관리할 리스트 안에 일자별 리스트를 넣음.
		for(int i=0; i<days; i++) {
			List<Location> innerList = new ArrayList<Location>();
			dayslist.add(innerList);
		}
		System.out.println("!1111");
		//기본 시작 위치인 서울을 세팅. 시작은 서울역이다.
		Startpoint startpoint = startpointRepository.findByCity(city);
		Location start = new Location().builder().city(startpoint.getCity()).locations(startpoint.getCode()).lat(startpoint.getLat()).lng(startpoint.getLng()).wcx(startpoint.getWcongnamulx()).wcy(startpoint.getWcongnamuly()).name(startpoint.getName()).build();
		dayslist.get(0).add(start);
		
		///////////////////////////////
		
		//여행지들의 정보가 담긴 리스트->locationList
		List<Location> locationList = new ArrayList<Location>();
		String[] locationSplit = locations.split(",");
		for(int i=0;i<locationSplit.length;i++) {
			TouristAttraction tourInfo = touristAttractionRepository.findByCode(locationSplit[i]);
			Location loc = new Location().builder().city(tourInfo.getCity()).locations(tourInfo.getCode()).lat(tourInfo.getLat()).lng(tourInfo.getLng()).name(tourInfo.getName()).wcx(tourInfo.getWcongnamulx()).wcy(tourInfo.getWcongnamuly()).tourTime(2).build();
			locationList.add(loc);
		}
		
		System.out.println("!222221");
		//호텔의 정보가 담긴 리스트->hotelList를 만든다. 똑같이 split을 한 다음에, 조금 다른것이 if문으로 NS일경우 LH로 보내자. 
		List<Location> hotelList = new ArrayList<Location>();

		String[] hotelSplit = hotels.split(",");
		for(int i=0;i<hotelSplit.length;i++) {
			Hotels hotelInfo = hotelsRepository.findByCodeAndCity(hotelSplit[i],city);
			Location hoLoc = new Location().builder().city(hotelInfo.getCity()).locations(hotelInfo.getCode()).lat(hotelInfo.getLat()).lng(hotelInfo.getLng()).wcx(hotelInfo.getWcongnamulx()).wcy(hotelInfo.getWcongnamuly()).name(hotelInfo.getName()).build();
			hotelList.add(hoLoc);
		}
		
		///////////////////////////////
		//선점하기
		//i=0번에 각 기본 호텔을 보내면 될거 같은데?
		for(int i=0;i<hotelList.size();i++) {
			if(i==0) {
				dayslist.get(0).add(hotelList.get(0));
			}else {
			dayslist.get(i).add(hotelList.get(i-1));
			}
		}//해당 연산을 진행하면, 데이리스트(0)에는 서울역,1일차호텔(0번째호텔). 데이리스트(1)에는 1일차호텔(0번째), 데이리스트(2)에는 2일차호텔(1번째)... 이런식으로 데이리스트가 존재하는한 앞에서부터 호텔이 채워진다.
		System.out.println("!3333");
		List<Location> deletedList = new ArrayList<Location>();
		
		
		//현재 1일차 인덱스 두개, 2일차~마지막날 1개인 상황.
		for(int i=0;i<dayslist.size();i++) {
			double shortest=100;
			int shortestIndex=-1;
			for(int j=0;j<locationList.size();j++) {
			//두 점 사이의 거리중 가장 짧은 점을 찾는다. i일차의 마지막 지점과, 장소들 리스트 사이의 두점사이의 거리를 구한다. 이것을 리스트에 담자.
				twoPointDistance(dayslist.get(i).get(dayslist.get(i).size()-1),locationList.get(j));
				//두 점 사이의 거리가 shortest보다 적고, 그룹이 없다면
				if(shortest>twoPointDistance(dayslist.get(i).get(dayslist.get(i).size()-1),locationList.get(j))&&locationList.get(j).getGroup()==null) { 
					//해당 길이를 shortest로 하고, 이때의 인덱스값을 j에 담는다.
					shortest=twoPointDistance(dayslist.get(i).get(dayslist.get(i).size()-1),locationList.get(j));
					shortestIndex=j;
				}
				////////리스트에서 빼버리면되지 그룹된건.. .그러면 매번 리스트에서 가장 짧은걸 찾으면 된다. 만약 리스트가 원본보다 적다면, distance를 줄여서 다시 함수를 재귀 실행한다.
			}
			//따라서 shortestIndex가 기본값이 아니였다면, &&
			//또한 방문하는데 시간의 문제가 없다면(해당 일정의 마지막 위치와, 경유지(다음관광지이자 이번에 선택될.), 그날종료호텔일정까지의 시간 집합 중 모든시간([2])가, 그날의 잔여시간리스트의값보다적다면.)
			if(shortestIndex!=-1){
				if(Double.parseDouble(timeToDestination(dayslist.get(i).get(dayslist.get(i).size()-1),locationList.get(shortestIndex),hotelList.get(i)))+locationList.get(shortestIndex).getTourTime()<timeArray[i]) {
					//해당 일정정의 마지막에 최단거리를 가진 위치를 집어넣는다.
				dayslist.get(i).add(locationList.get(shortestIndex));
				//해당 위치의 그룹을 해당 날짜 와 같은 인덱스의 그룹으로 밀어버린다.
				locationList.get(shortestIndex).setGroup(Integer.toString(i));
				//재귀적으로 그룹을 부여하는 방법-------> 일단은 그냥 반복문으로만 할게요.
				for(int k=0;k<locationList.size();k++){
					//자기자신과의 거리는 0일것이므로 일단 제외를 해두고,
					if(k!=shortestIndex) {
						//두 점 사이의 거리가 distance보다 적으면서, 동시에 그룹이 없다면.
						if(twoPointDistance(locationList.get(shortestIndex),locationList.get(k))<distance&&locationList.get(k).getGroup()==null) {
							//그룹을 넣어준다.
							locationList.get(k).setGroup(Integer.toString(i));
							//재귀적으로 반복한다.
							//함수로 만들고 이곳에 함수를 붙여 넣어주세요
							//테스트하고 봅시다.##################################
						}
					}
				}
				//지워진 리스트로 해당 위치를 넣는다
				deletedList.add(locationList.get(shortestIndex));
				timeArray[i]=timeArray[i]-locationList.get(shortestIndex).getTourTime();
				//로케이션 리스트에서 해당 위치를 지워버린다.
				locationList.remove(shortestIndex);
			}//else if(shortestIndex==-1){ }->모두 그룹을 가지고 있을 때 여기에 걸린다. 이럴때는 재귀적 그룹 부여 방법에서 distance를 짧게 하고 바꾸고 다시 돌리는수밖에?------>
			//여기에 else if문의 함수를
			//넣어주세요############################################
		}
			
		}
		
		System.out.println("444");
//		앞으로 남은거.
//		1.첫일정분배 알고리즘 정리 및 리팩토링
//		2.나머지 일정 분배하는 알고리즘
//		
//		1에서 해야할것. else문을 구현은 나중에 하고. 재귀반복도 나중에하고. 시간을 어떻게 처리하자.
//		그럼 어떻게? 일단 최단거리를 찾고 최단거리로 api를 이용해 값을 받은 다음에, 시간연산
//		관광지A→관광지B→호텔 이기때문에. 해당 길이+ 관B의 관광시간 < 잔여시간 연산을 하자.
//		
//		2의 초안
//		그룹우선분배를 적용. 그룹우선분배로 일정을 정리한다.
		
		
//2.나머지 일정 분배하는 알고리즘부터 먼저.
		dayslist = tourDistribute(dayslist, locationList, hotelList, timeArray);	 // 
		
//		List<String> returnList = new ArrayList<String>(); //길이가 일(日)자인 리스트를 만든다.
//		
//		for(int i=0;i<dayslist.size();i++) {
//			System.out.println(i+"박차");
//			
//			String listString="";
//			
//			for(int j=0;j<(dayslist.get(i)).size();j++) {
//				System.out.println(((Location) dayslist.get(i).get(j)).getLocations());
//				listString += (dayslist.get(i).get(j)).getLocations();
//				if(j!=dayslist.get(i).size()-1) {
//					listString +=",";
//				}
//			}
//			returnList.add(listString);
//			System.out.println(listString);
//				
//			}
		
		
//		for(int i=0;i<returnList.size();i++) {
//			System.out.println(i+"박차 리스트");
//			System.out.println(returnList.get(i));
//		}
//		
//		System.out.println("데이터를받아보자");
//		System.out.println(timeToDestination(dayslist.get(0).get(0),dayslist.get(0).get(1),dayslist.get(0).get(2)));
		
		return dayslist;
	}
	
	//그룹화를 위한 기본거리. DB가 없어요..
	public static double standardDistance(String city) {
		double distance=0;
		
		if(city.equals("seoul")) {
			
			distance=0.05;
			}
		
		
		return distance;
		
	}
		
	//카카오내비 길찾기에 REST API를 이용하여 A->B->C , A-B , B-C 사이의 거리를 정수값으로 변환된 시간을 받는 메소드 
	public static String timeToDestination(Location first, Location second, Location third) {
		String origin = first.getLng()+","+first.getLat();
		String waypoints = second.getLng()+","+second.getLat();
		String destination = third.getLng()+","+third.getLat();
		String url = "https://apis-navi.kakaomobility.com/v1/directions?origin="+origin+"&destination="+destination+"&waypoints="+waypoints;
		String value="";
		try {
			value = getTimeToDestination(getJSONData(url)); // 에러 

		}catch (Exception e) {
			System.out.println("주소 api 요청 에러");
			e.printStackTrace();
		}
		
		return value;
	}
	
	//REST API로 통신하여 받은 JSON 형태의 데이터를 String으로 받아오는 메소드.
	public static String getJSONData(String apiUrl) throws Exception {

		HttpURLConnection conn = null;
		StringBuffer response = new StringBuffer();
		
		//인증키
		String restAPIKey="InputYourApiKey";
		String auth = "KakaoAK "+restAPIKey;
		//URL 설정
		URL url = new URL(apiUrl);
		
		conn = (HttpURLConnection) url.openConnection();
		
		//Request 형식 설정
		conn.setRequestMethod("GET");
		//conn.setRequestProperty("X-Requested-With", "curl"); ->왜 필요한가?
		conn.setRequestProperty("Authorization", auth);
		
		//request에 JSON data 준비
		conn.setDoOutput(true);
		
		int responseCode = conn.getResponseCode();
		    if (responseCode == 400) {
		        System.out.println("400:: 해당 명령을 실행할 수 없음");
			} else if (responseCode == 401) {
			    System.out.println("401:: Authorization가 잘못됨");
			} else if (responseCode == 500) {
			    System.out.println("500:: 서버 에러, 문의 필요");
			} else { // 성공 후 응답 JSON 데이터받기
		 
				Charset charset = Charset.forName("UTF-8");
				BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), charset));
		     
				String inputLine;
		    while ((inputLine = br.readLine()) != null) {
		     	response.append(inputLine); 
		    } 
		 }
		 
		 return response.toString();
	}
	
	//받은 JSON 파일을 파싱한다.
	//나는이걸더블로받아서쉽게계산하고싶은데세상은나를도와주지않는다나는너무화가난다
	public static String getTimeToDestination(String jsonString) {
		String value="";
		//double[] returnArray=new double[2];
		
		JSONObject jObj = (JSONObject) JSONValue.parse(jsonString);
		
		JSONArray routes = (JSONArray) jObj.get("routes");
		JSONObject routesFirstArray = (JSONObject) routes.get(0);
		JSONArray sectionsFirst = (JSONArray) routesFirstArray.get("sections");
		JSONObject sectionFirstArray = (JSONObject) sectionsFirst.get(0);
		long durationFirst = (long) sectionFirstArray.get("duration");
		JSONObject sectionSecondArray = (JSONObject) sectionsFirst.get(1);
		long durationSecond = (long) sectionSecondArray.get("duration");
		
		double firstHour = (double) durationFirst/3600;
		double secondHour = (double) durationSecond/3600;
		
//		returnArray[0]=firstHour;
//		returnArray[1]=secondHour;
		//returnArray[2]=firstHour+secondHour;
		
		value=Double.toString(firstHour+secondHour);

		
		return value;
	}
	
	//나머지를 분배하는 알고리즘을 제작한다
	public static List<List<Location>> tourDistribute(List<List<Location>> dayslist,List<Location> locationList,List<Location> hotelList,Double[] timeArray){
		
		List<Location> deletedList = new ArrayList<Location>();
		
		

		for(int ab=0;ab<5;ab++) {
			
		for(int i=0;i<dayslist.size();i++) {
			double shortest=100;
			int shortestIndex=-1;
			
			
			if(dayslist.get(i).get(dayslist.get(i).size()-1)!=hotelList.get(i)) {
				
				
			for(int j=0;j<locationList.size();j++) {
				//두 점 사이의 거리중 가장 짧은 점을 찾는다. i일차의 마지막 지점과, 장소들 리스트 사이의 두점사이의 거리를 구한다. 이것을 리스트에 담자.
				//두 점 사이의 거리가 shortest보다 적고, 그룹이 없다면
				if(shortest>twoPointDistance(dayslist.get(i).get(dayslist.get(i).size()-1),locationList.get(j))) { 
					//해당 길이를 shortest로 하고, 이때의 인덱스값을 j에 담는다.
					shortest=twoPointDistance(dayslist.get(i).get(dayslist.get(i).size()-1),locationList.get(j));
					shortestIndex=j;
				}
				////////리스트에서 빼버리면되지 그룹된건.. .그러면 매번 리스트에서 가장 짧은걸 찾으면 된다. 만약 리스트가 원본보다 적다면, distance를 줄여서 다시 함수를 재귀 실행한다.
			}
			//따라서 shortestIndex가 기본값이 아니였다면, &&
			//또한 방문하는데 시간의 문제가 없다면(해당 일정의 마지막 위치와, 경유지(다음관광지이자 이번에 선택될.), 그날종료호텔일정까지의 시간 집합 중 모든시간([2])가, 그날의 잔여시간리스트의값보다적다면.)
			if(shortestIndex!=-1) {
				// 여기 
				System.out.println();
				double goToTourTime=Double.parseDouble(timeToDestination(dayslist.get(i).get(dayslist.get(i).size()-1),locationList.get(shortestIndex),hotelList.get(i)))+locationList.get(shortestIndex).getTourTime();
				if(goToTourTime<timeArray[i]){
				//해당 일정정의 마지막에 최단거리를 가진 위치를 집어넣는다.
				dayslist.get(i).add(locationList.get(shortestIndex));
				//해당 위치의 그룹을 해당 날짜 와 같은 인덱스의 그룹으로 밀어버린다.
//				locationList.get(shortestIndex).setGroup(Integer.toString(i));
				//재귀적으로 그룹을 부여하는 방법-------> 일단은 그냥 반복문으로만 할게요.
//				for(int k=0;k<locationList.size();k++){
//					//자기자신과의 거리는 0일것이므로 일단 제외를 해두고,
//					
////					if(k!=shortestIndex) {
////					
////						
////						//두 점 사이의 거리가 distance보다 적으면서, 동시에 그룹이 없다면.
////						if(twoPointDistance(locationList.get(shortestIndex),locationList.get(k))<distance&&locationList.get(k).getGroup()==null) {
////							//그룹을 넣어준다.
////							locationList.get(k).setGroup(Integer.toString(i));
////							//재귀적으로 반복한다.
////							//함수로 만들고 이곳에 함수를 붙여 넣어주세요
////							//테스트하고 봅시다.##################################
////						}
////					}
//				}
				//지워진 리스트로 해당 위치를 넣는다
				
				//로케이션 리스트에서 해당 위치를 지워버린다.

				timeArray[i]=timeArray[i]-goToTourTime;
				deletedList.add(locationList.get(shortestIndex));
				locationList.remove(shortestIndex);
				}else if((Double.parseDouble(timeToDestination(dayslist.get(i).get(dayslist.get(i).size()-1),locationList.get(shortestIndex),hotelList.get(i)))+locationList.get(shortestIndex).getTourTime())>timeArray[i]){ 
					dayslist.get(i).add(hotelList.get(i));
				
				}
			}
			
			//분배를 끝낼때 각 지점의 마지막이 호텔이 아니라면 호텔로 보낸다.


				
			}
		
		}// i를 쓰는 for문 end

		System.out.println(locationList.toString());
		for(int tt=0;tt<timeArray.length;tt++) {
			System.out.println(timeArray[tt]);
			System.out.println(tt+"일차 남은시간입니다");
		}
		}//5번반복 end
		for(int i=0;i<dayslist.size();i++) {
		if(dayslist.get(i).get(dayslist.get(i).size()-1)!=hotelList.get(i)) {
			dayslist.get(i).add(hotelList.get(i));
		}
		}
		return dayslist;
	}
	public void savePlan(String dataKr,String title,String city,Long userid) {
		LocalDateTime currentDateTime = LocalDateTime.now();    
		
		CityList citylist = cityListRepository.findByCitynamee(city);
		System.out.println(citylist);
		MyPlans myplan=MyPlans.builder().userid(userid).myplan(dataKr).myplantitle(citylist.getCityname()+"여행").city(citylist.getCityname()).createDate(currentDateTime).planinfo(title).build();
		myPlansRepository.save(myplan);
//		
		
	}
	
}