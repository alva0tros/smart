package com.mango.smart.config.security;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Component
public class SecurityLogoutHandler implements LogoutSuccessHandler {
	
	private static final Logger logger = LoggerFactory.getLogger(SecurityLogoutHandler.class);
	
	@Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response,
                                Authentication authentication) throws IOException, ServletException {
        HttpSession session = request.getSession(false);
        if (session != null) {
            logger.info("Session invalidated: " + session.getId());
        }
        logger.info("User logged out successfully");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().flush();
    }

}
