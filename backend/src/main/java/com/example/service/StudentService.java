package com.example.service;

import com.example.exception.StudentNotFoundException;
import com.example.model.Student;
import com.example.repository.StudentRepository;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public void deleteStudent(int id) {
        studentRepository.delete(id);
    }

    public List<Student> searchByName(String name) {
        return studentRepository.searchByName(name);
    }

    public Student addStudent(Student student) {
        int currentYear = Calendar.getInstance().get(Calendar.YEAR);
        if (student.getYear() > currentYear) {
            throw new IllegalArgumentException("Year must be <= " + currentYear);
        }
        return studentRepository.save(student);
    }

    public Student updateStudent(int id, Student updated) {
        return studentRepository.update(id, updated);
    }

    public Student getStudentById(int id) {
        try {
            return studentRepository.findById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new StudentNotFoundException(id);
        }
    }
}