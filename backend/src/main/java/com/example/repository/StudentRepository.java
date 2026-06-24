package com.example.repository;

import com.example.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

@Repository
public class StudentRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // RowMapper — tells Spring how to convert one DB row → Student object
    private final RowMapper<Student> rowMapper = new RowMapper<Student>() {
        public Student mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new Student(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("email"),
                    rs.getString("course"),
                    rs.getInt("year")
            );
        }
    };

    public List<Student> findAll() {
        return jdbcTemplate.query("SELECT * FROM students", rowMapper);
    }

    public List<Student> searchByName(String name) {
        return jdbcTemplate.query(
                "SELECT * FROM students WHERE LOWER(name) LIKE ?",
                rowMapper,
                "%" + name.toLowerCase() + "%"
        );
    }

    public Student save(Student s) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(conn -> {
            PreparedStatement ps = conn.prepareStatement(
                    "INSERT INTO students (name, email, course, year) VALUES (?,?,?,?)",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, s.getName());
            ps.setString(2, s.getEmail());
            ps.setString(3, s.getCourse());
            ps.setInt(4, s.getYear());
            return ps;
        }, keyHolder);
        s.setId(keyHolder.getKey().intValue());
        return s;
    }

    public void delete(int id) {
        jdbcTemplate.update("DELETE FROM students WHERE id=?", id);
    }

    public Student findById(int id) {
        return jdbcTemplate.queryForObject(
                "SELECT * FROM students WHERE id=?",
                rowMapper, id
        );
    }

    public Student update(int id, Student s) {
        jdbcTemplate.update(
                "UPDATE students SET name=?, email=?, course=?, year=? WHERE id=?",
                s.getName(), s.getEmail(), s.getCourse(), s.getYear(), id
        );
        return s;
    }
}