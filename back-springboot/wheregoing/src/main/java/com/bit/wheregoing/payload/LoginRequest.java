package com.bit.wheregoing.payload;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
// 이메일 패스워드   이메일로만 로그인 되게 

public class LoginRequest {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
