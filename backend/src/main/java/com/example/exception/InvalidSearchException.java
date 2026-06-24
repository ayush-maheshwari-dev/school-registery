package com.example.exception;

public class InvalidSearchException extends RuntimeException {
    public InvalidSearchException(String message) {
        super(message);
        //System.out.print("Exception run correctly");
    }
}