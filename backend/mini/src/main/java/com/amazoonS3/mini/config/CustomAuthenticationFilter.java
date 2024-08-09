package com.amazoonS3.mini.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain chain, Authentication authResult) throws IOException, ServletException {
        // Call the parent class's successfulAuthentication to ensure proper handling
        super.successfulAuthentication(request, response, chain, authResult);

        // Redirect to a page for authenticated users
        if (authResult.isAuthenticated()) {
            response.sendRedirect("/home"); // Redirect to /home after successful login
        }
    }
}
