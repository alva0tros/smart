package com.mango.smart.config.security;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SecurityController {

    @GetMapping(value = { "/", "/login", "/sys/*", "/std/*" })
    public String forward() {
        return "forward:/index.html";
    }
    
    @GetMapping("/auth/user")
    public ResponseEntity<SecurityUser> getCurrentUser(@AuthenticationPrincipal SecurityUser userInfo) {
        return ResponseEntity.ok(userInfo);
    }
}