package com.example.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class Student {
    private int id;

    @NotBlank(message = "Enter name")
    @Size(min = 3, max = 16, message = "Name too long")
    private String name;

    @NotBlank(message = "Enter email")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Select course")
    private String course;

    @Min(value = 1900, message = "Year must be after 1900")
    private int year;

    // Default constructor — REQUIRED for form binding
    public Student() {}

    // Constructor — order must match exactly
    public Student(int id, String name, String email, String course, int year) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.course = course;
        this.year = year;
    }

    // Getters
    public int getId()        { return id; }
    public String getName()   { return name; }
    public String getEmail()  { return email; }
    public String getCourse() { return course; }
    public int getYear()      { return year; }

    // Setters
    public void setId(int id)            { this.id = id; }
    public void setName(String name)     { this.name = name; }
    public void setEmail(String email)   { this.email = email; }
    public void setCourse(String course) { this.course = course; }
    public void setYear(int year)        { this.year = year; }
}