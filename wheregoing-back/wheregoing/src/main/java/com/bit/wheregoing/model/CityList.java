package com.bit.wheregoing.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class CityList {
	
	@Id //Primary Key
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; //auto_increment
	
	@Column(nullable = false, length = 45)
	private String doname; // 지역
	
	@Column(nullable = false, length = 45)
	private String cityname; //도시 이름
	@Column(nullable=false)
	private String citynamee;
	@Column
	@Lob
	private String cityinfo;
	
}
