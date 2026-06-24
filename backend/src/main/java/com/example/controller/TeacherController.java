package com.example.controller;

import com.example.exception.InvalidSearchException;
import com.example.model.Teacher;
import com.example.service.TeacherService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/teachers")
public class TeacherController {

    private final TeacherService teacherService;

    // Constructor Injection
    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping
    public List<Teacher> getAllteacher() {
        return teacherService.getAllTeachers();
    }

    @GetMapping("/{id}")
    public Teacher getOne(@PathVariable int id) {
        return teacherService.getTeacherById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<Teacher> create(@Valid @RequestBody Teacher teacher) {
        Teacher saved = teacherService.addTeacher(teacher);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public Teacher update(@PathVariable int id, @Valid @RequestBody Teacher teacher) {
        return teacherService.updateTeacher(id, teacher);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        teacherService.deleteTeacher(id);
        return ResponseEntity.noContent().build();   // 204
    }

    @GetMapping("/search")
    public List<Teacher> search(@RequestParam String name) {
        return teacherService.searchByName(name);    // empty list is OK, no throw
    }
}