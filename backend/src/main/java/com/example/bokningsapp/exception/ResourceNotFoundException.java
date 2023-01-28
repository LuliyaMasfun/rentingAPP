package com.example.bokningsapp.exception;

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String message, Long id) {
        super(message);
    }
}
