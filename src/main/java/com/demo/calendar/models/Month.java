package com.demo.calendar.models;

import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(	name = "months" )
public class Month {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ElementCollection
	private List<String> days;
	private String month;
	private String focus;
	private String userId;

	public Month() {
	}

	public Month(String month, List<String> days, String focus, String userId) {
		this.days = days;
		this.month = month;
		this.focus = focus;
        this.userId = userId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<String> getDays() {
		return new ArrayList<String>(this.days);
	}

	public void setDays(List<String> content) {
		this.days = new ArrayList<String>(content);
	}

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }
    	
	public String getFocus() {
        return focus;
    }

    public void setFocus(String focus) {
        this.focus = focus;
    }

	public String getUserId() {
		return this.userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
}