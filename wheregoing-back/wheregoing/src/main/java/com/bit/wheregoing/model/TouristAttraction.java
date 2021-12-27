package com.bit.wheregoing.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class TouristAttraction {
	
	
	@Id //Primary Key
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; //auto_increment
	
	@Column(nullable = false, length = 45)
	private String city; //소속도시
	
	@Column(nullable = false, length = 45)
	private String code; //영문코드명
	
	@Column(nullable = false, length = 45)
	private String name; //한국어 이름
	
	@Column(nullable = false, length = 200)
	private String content; //한국어 설명
	
	@Column(nullable = false)
	private double lat; //위도
	
	@Column(nullable = false)
	private double lng; //경도
	
	@Column(nullable = false)
	private double wcongnamulx; //카카오 길찾기용 x좌표
	
	@Column(nullable = false)
	private double wcongnamuly; //카카오 길찾기용 y좌표
	
}
