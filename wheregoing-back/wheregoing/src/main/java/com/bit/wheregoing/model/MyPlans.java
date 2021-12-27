package com.bit.wheregoing.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters.LocalDateTimeConverter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity	
public class MyPlans {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long myplansid;
	
	@Column(nullable = false, length = 40)
	private Long userid;
	
//	@Lob
	@Column(nullable = false)
	private String myplan;
	
	@Column(nullable = false)
	private String myplantitle;
	
	@Column(nullable=true)
	private String city;
	
    @CreatedDate
    @Column(updatable = false, nullable = false)
    @Convert(converter = LocalDateTimeConverter.class)
    private LocalDateTime createDate;
	
    @Column(nullable = true)
    private String planinfo;
}
