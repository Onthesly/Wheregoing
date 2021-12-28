package com.bit.wheregoing.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyPlansRequest {
	
	@NotNull
	private Long userid;
	
	@NotBlank
	@Email
	private String email;
}
