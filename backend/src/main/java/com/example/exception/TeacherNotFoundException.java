package com.example.exception;

public class TeacherNotFoundException extends RuntimeException {
    public TeacherNotFoundException(int id) {
        super("Teacher not found with id: " + id);
    }
}
