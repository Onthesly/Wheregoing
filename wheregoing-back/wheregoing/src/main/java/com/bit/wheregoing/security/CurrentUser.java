package com.bit.wheregoing.security;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import java.lang.annotation.*;

// 컨트롤러에 현재 인증된 사용자 주체를 삽입하는 데 사용할 수 있는 메타 주석입
@Target({ElementType.PARAMETER, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@AuthenticationPrincipal
public @interface CurrentUser {

}