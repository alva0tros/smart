package com.mango.smart.config.exception;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ErrorResponse {

	private LocalDateTime timestamp;
    private String message;

    public ErrorResponse(String message) {
        this.timestamp = LocalDateTime.now();
        this.message = message;
    }
	
}
