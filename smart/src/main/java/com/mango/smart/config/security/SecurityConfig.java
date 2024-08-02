package com.mango.smart.config.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    @Autowired
    private SecurityLogoutHandler logoutHandler;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        
        http.csrf(AbstractHttpConfigurer::disable);
        
        http.authorizeHttpRequests((requests) -> requests
                .requestMatchers("/login", "/loginProc", "/auth/user").permitAll()
                .requestMatchers("/index.html", "/assets/**").permitAll()
                .requestMatchers("/api").authenticated() 
                .anyRequest().authenticated())
            .formLogin((form) -> form
            	.loginPage("/login")
                .loginProcessingUrl("/loginProc")
                .permitAll()
                .successHandler(this::loginSuccessHandler)
                .failureHandler(this::loginFailureHandler))
            .logout((logout) -> logout
                .logoutUrl("/logout")
                .logoutSuccessHandler(logoutHandler)
                .logoutSuccessUrl("/login")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .permitAll())
            .sessionManagement(session -> session
                    .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
            .cors(Customizer.withDefaults());

        return http.build();
    }
    
    private void loginSuccessHandler(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException {
        SecurityUser user = (SecurityUser) authentication.getPrincipal();

        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("success", true);
        responseBody.put("user", user);

        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(objectMapper.writeValueAsString(responseBody));
    }

    private void loginFailureHandler(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException exception) throws IOException {
        
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("success", false);
        responseBody.put("error", exception.getMessage());
        
        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(objectMapper.writeValueAsString(responseBody));
    }
    
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
}