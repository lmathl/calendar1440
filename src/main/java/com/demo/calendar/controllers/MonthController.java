package com.demo.calendar.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demo.calendar.models.Month;
import com.demo.calendar.repository.MonthRepository;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/api")
public class MonthController {

	@Autowired
	MonthRepository monthRepository;

	@GetMapping("/months")
	public ResponseEntity<List<Month>> getAllMonths(@RequestParam(required=false) String userId){
		try {
			List<Month> months = new ArrayList<Month>();
			System.out.println("====get months");

			monthRepository.findByUserId(userId).forEach(months::add);
			System.out.println(months);
			System.out.println(months.isEmpty());
			
			if (months.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			
			return new ResponseEntity<>(months, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);

			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/months/{id}")
	public ResponseEntity<Month> getMonthById(@PathVariable("id") long id) {
		Optional<Month> monthData = monthRepository.findById(id);

		if (monthData.isPresent()) {
			return new ResponseEntity<>(monthData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/months")
	public ResponseEntity<Month> createMonth(@RequestBody Month month) {
		try {
			System.out.println("=====saving month");
			System.out.println(month);
			System.out.println(month.getMonth());
			System.out.println(month.getDays());
			System.out.println(month.getFocus());
			System.out.println(month.getUserId());
			Month _month = monthRepository
					.save(new Month(month.getMonth(), month.getDays(), month.getFocus(), month.getUserId()));
			System.out.println(_month);

			
			return new ResponseEntity<>(_month, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/months/{id}")
	public ResponseEntity<Month> updateMonth(@PathVariable("id") long id, @RequestBody Month month) {
		Optional<Month> monthData = monthRepository.findById(id);

		if (monthData.isPresent()) {
			Month _month = monthData.get();
			_month.setMonth(month.getMonth());
			_month.setDays(month.getDays());
			_month.setFocus(month.getFocus());
			_month.setUserId(month.getUserId());
			return new ResponseEntity<>(monthRepository.save(_month), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/months/{id}")
	public ResponseEntity<HttpStatus> deleteMonth(@PathVariable("id") long id) {
		try {
			monthRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/months")
	public ResponseEntity<HttpStatus> deleteAllMonths() {
		try {
			monthRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}
