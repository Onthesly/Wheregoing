package com.bit.wheregoing.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyPlansDetailRequest {
	
	@NotNull
	private Long userid;
	
	@NotNull
	private Long myplansid;
	
	@NotBlank
	private String myplan;
	
	@NotBlank
	private String myplantitle;
	@NotBlank
	private String city;
	

}
