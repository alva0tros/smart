package com.mango.smart.config.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {
	
	public static int getUserId() throws Exception {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ((SecurityUser) authentication.getPrincipal()).getUser_id(); 
    }

}
