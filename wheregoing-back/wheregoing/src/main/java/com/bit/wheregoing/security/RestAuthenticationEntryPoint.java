package com.bit.wheregoing.security;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


//이 클래스는 사용자가 인증 없이 보호된 리소스에 액세스하려고 할 때 호출됩니다. 이 경우 401 Unauthorized 응답을 반환
// 클래스 목적 예외처리 JWT토큰이 검증되지 않을 때마다 승인되지 않은 예외 발생 
//인증되지 않은 사용자가 보안 HTTP 리소스를 요청할 때마다 트리거됨 
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private static final Logger logger = LoggerFactory.getLogger(RestAuthenticationEntryPoint.class);

    @Override
    public void commence(HttpServletRequest httpServletRequest,
                         HttpServletResponse httpServletResponse,
                         AuthenticationException e) throws IOException, ServletException {
        logger.error("Responding with unauthorized error. Message - {}", e.getMessage());
        httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED,
                e.getLocalizedMessage());  // SC_UNAUTHORIZED  401 
    }
}
