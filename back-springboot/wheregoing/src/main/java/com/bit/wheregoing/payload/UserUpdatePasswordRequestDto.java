package com.bit.wheregoing.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class UserUpdatePasswordRequestDto {
	@NotNull
	private Long userid;
   @NotBlank
    private String password;

    @NotBlank
    @Email
    private String useremail;


    
}
