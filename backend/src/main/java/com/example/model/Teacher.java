package com.example.model;

import javax.validation.constraints.*;

public class Teacher {
    private int id;

    @NotBlank(message = "Enter name")
    @Size(min = 3, max = 16, message = "Name too long")
    private String name;

    @NotBlank(message = "Enter email")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Select subject")
    private String subject;

    @NotBlank(message = "Select department")
    private String department;

    @NotNull(message = "Select department")
    @Min(value = 0, message = "Experience must be non-negative")
    @Max(value = 50, message = "Experience cannot exceed 50 years")
    private int experience;

    @NotNull(message = "Select department")
    @Positive(message = "Salary must be a positive value")
    @Min(value = 30000, message = "Salary must be greater than 30000")
    @Max(value = 200000, message = "Salary must be less than 200000")
    private double salary;

    public Teacher(int id,String name , String email, String subject,String department, int experience,double salary){
        this.id=id;
        this.name = name;
        this.subject=subject;
        this.experience=experience;
        this.email =email;
        this.department=department;
        this.salary = salary;
    }

    // Default constructor — REQUIRED for form binding
    public Teacher() {}

    // getter
    public int getId(){ return id; }
    public String getName(){return name;}
    public String getSubject(){return subject;}
    public int getExperience(){return experience;}
    public String getEmail() {return email;}
    public String getDepartment() {return department;}
    public double getSalary(){return salary;}

    //setter
    public void setId(int id){this.id = id;}
    public void setName(String name){this.name= name; }
    public void setSubject(String subject){this.subject = subject;}
    public void setExperience(int experience){this.experience=experience;}
    public void setEmail(String email){this.email= email;}
    public void setDepartment(String department){this.department= department;}
    public void setSalary(double salary){this.salary=salary;}
}
