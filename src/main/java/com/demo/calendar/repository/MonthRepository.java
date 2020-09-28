package com.demo.calendar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.calendar.models.Month;

public interface MonthRepository extends JpaRepository<Month, Long> {
    public List<Month> findByUserId(String userId);
}
