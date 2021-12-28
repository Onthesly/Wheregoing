package com.bit.wheregoing.security;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
// 클라이언트 또는 반응js에서 요청 필터링 터리 
// 요청에서 JWT 인증 토큰을 읽고, 확인하고, SecurityContext토큰이 유효한 경우 Spring Security를 ​​설정하는 데 사용
public class TokenAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(TokenAuthenticationFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = getJwtFromRequest(request);
//            String requestURI = HttpServletRequest.getRequestURI();
            System.out.println("doFilterInternal : "+jwt);  
            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                Long userId = tokenProvider.getUserIdFromToken(jwt);
                System.out.println("doFilterInternal 의 유저 아이디" + userId);
                UserDetails userDetails = customUserDetailsService.loadUserById(userId);
                System.out.println("userDetails 의 유저 아이디222" + userDetails);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                System.out.println("테스트 33333");
                SecurityContextHolder.getContext().setAuthentication(authentication);
                System.out.println("Security Context에 {"+authentication.getName()+"} 인증 정보를 저장했습니다, uri: ");
            }
        } catch (Exception ex) {
            logger.error("Could not set user authentication in security context", ex);
        }
        System.out.println("테스트 55555");
        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
    	System.out.println(request);
    	System.out.println("getJwtFromRequest   1 "+request.getHeader(ALREADY_FILTERED_SUFFIX));
        String bearerToken = request.getHeader("Authorization");// 요청한 헤더가 이게 없구나 ... 
        System.out.println("getJwtFromRequest   2 "+bearerToken);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
        	System.out.println(bearerToken.substring(7, bearerToken.length()));
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
}
