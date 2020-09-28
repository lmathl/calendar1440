package com.demo.calendar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.calendar.models.Custom;

public interface CustomRepository extends JpaRepository<Custom, Long> {
    public List<Custom> findByUserId(String userId);
}
