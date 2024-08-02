package com.mango.smart.config.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(Exception.class)
	public ResponseEntity<Object> handleGlobalException(Exception ex, WebRequest request) {
		Map<String, Object> errorDetails = new HashMap<>();
		errorDetails.put("error", true);
		errorDetails.put("status", "error");
		errorDetails.put("message", ex.getMessage());
		errorDetails.put("cause", formatErrorCause(ex));
		errorDetails.put("stackTrace", getStackTraceAsString(ex));
		errorDetails.put("requestDescription", request.getDescription(false));
		ex.printStackTrace();
		return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	private String getStackTraceAsString(Exception ex) {
		StringBuilder sb = new StringBuilder();
		for (StackTraceElement element : ex.getStackTrace()) {
			sb.append(element.toString());
			sb.append("\n");
		}
		return sb.toString();
	}

	private String formatErrorCause(Exception ex) {
		if (ex.getCause() == null) {
			return null;
		}

		StringBuilder causeMessage = new StringBuilder();
		Throwable cause = ex.getCause();
		while (cause != null) {
			causeMessage.append(cause.getClass().getSimpleName()).append(": ").append(cause.getMessage());

			cause = cause.getCause();
			if (cause != null) {
				causeMessage.append(" -> ");
			}
		}

		return causeMessage.toString();
	}

}
