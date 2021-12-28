package com.bit.wheregoing.payload;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyPlansReponse {
	private Long myplansid;
	private Long userid;
	private String myplan;
	private String myplantitle;
	private LocalDateTime createDate;
	private String planinfo;
}
