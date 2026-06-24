package com.example.repository;

import com.example.model.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import java.sql.PreparedStatement;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import java.sql.Statement;

@Repository
public class TeacherRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<Teacher> rowMapper = new RowMapper<Teacher>() {
        @Override
        public Teacher mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new Teacher(
            rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("email"),
                    rs.getString("subject"),
                    rs.getString("department"),
                    rs.getInt("experience"),
                    rs.getDouble("salary")
            );
        }
    };

    public Teacher findById(int id) {
        return jdbcTemplate.queryForObject(
                "SELECT * FROM teachers WHERE id=?",
                rowMapper, id
        );
    }

    public Teacher save(Teacher t) {
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(conn -> {
            PreparedStatement ps = conn.prepareStatement(
                    "INSERT INTO teachers (name, email, subject, department, experience, salary) " +
                            "VALUES (?,?,?,?,?,?)",
                    Statement.RETURN_GENERATED_KEYS
            );

            ps.setString(1, t.getName());
            ps.setString(2, t.getEmail());
            ps.setString(3, t.getSubject());
            ps.setString(4, t.getDepartment());
            ps.setInt(5, t.getExperience());
            ps.setDouble(6, t.getSalary());

            return ps;
        }, keyHolder);

        t.setId(keyHolder.getKey().intValue());

        return t;
    }

    public void delete(int id) {
        jdbcTemplate.update("DELETE FROM teachers WHERE id=?", id);
    }

    public Teacher update(int id, Teacher t) {
        jdbcTemplate.update(
                "UPDATE teachers SET name=?, email=?, subject=?, department=?, experience=?, salary=? WHERE id=?",
                t.getName(), t.getEmail(), t.getSubject(), t.getDepartment(), t.getExperience(), t.getSalary(), id
        );
        return t;
    }

    public java.util.List<Teacher> findAll() {
        return jdbcTemplate.query("SELECT * FROM teachers", rowMapper);
    }

    public List<Teacher> searchByName(String name) {
        return jdbcTemplate.query(
                "SELECT * FROM teachers WHERE LOWER(name) LIKE ?",
                rowMapper,
                "%" + name.toLowerCase() + "%"
        );
    }
}