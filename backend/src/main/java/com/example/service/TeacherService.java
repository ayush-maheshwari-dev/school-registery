package com.example.service;

import com.example.exception.TeacherNotFoundException;
import com.example.model.Teacher;
import com.example.repository.TeacherRepository;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;

    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    public Teacher addTeacher(Teacher teacher){
        return teacherRepository.save(teacher);
    }

    public void deleteTeacher(int id){
        teacherRepository.delete(id);
    }

    public List<Teacher> searchByName(String name){
        return teacherRepository.searchByName(name);
    }

    public Teacher getTeacherById(int id){
        try{
            return teacherRepository.findById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new TeacherNotFoundException(id);
        }
    }

    public Teacher updateTeacher(int id, Teacher updated){
        return teacherRepository.update(id, updated);
    }
}