package com.demo.calendar.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

import com.demo.calendar.models.Custom;
import com.demo.calendar.repository.CustomRepository;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/api")
public class CustomController {

	@Autowired
	CustomRepository customRepository;

	@GetMapping("/customs")
	public ResponseEntity<List<Custom>> getAllCustoms(@RequestParam(required = false) String userId) {
		try {
			List<Custom> customs = new ArrayList<Custom>();

			customRepository.findByUserId(userId).forEach(customs::add);

			if (customs.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(customs, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/customs/{id}")
	public ResponseEntity<Custom> getCustomById(@PathVariable("id") long id) {
		Optional<Custom> customData = customRepository.findById(id);

		if (customData.isPresent()) {
			return new ResponseEntity<>(customData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/customs")
	public ResponseEntity<Custom> createCustom(@RequestBody Custom custom) {
		try {
			Custom _custom = customRepository
					.save(new Custom(custom.getMonFirst(), custom.getShowWeekday(),
						custom.getShowMonth(), custom.getShowYear(),
						custom.getShowFocus(), custom.getWeekdayShortForm(),
						custom.getTableBackgroundColor(), custom.getTextColor(),
						custom.getBackgroundImage(), custom.getUserId()
					));
			return new ResponseEntity<>(_custom, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/customs/{id}")
	public ResponseEntity<Custom> updateCustom(@PathVariable("id") long id, @RequestBody Custom custom) {
		Optional<Custom> customData = customRepository.findById(id);

		if (customData.isPresent()) {
			Custom _custom = customData.get();
			_custom.setMonFirst(custom.getMonFirst());
			_custom.setShowWeekday(custom.getShowWeekday());
			_custom.setShowMonth(custom.getShowMonth());
			_custom.setShowYear(custom.getShowYear());
			_custom.setShowFocus(custom.getShowFocus());
			_custom.setWeekdayShortForm(custom.getWeekdayShortForm());
			_custom.setTableBackgroundColor(custom.getTableBackgroundColor());
			_custom.setTextColor(custom.getTextColor());
			_custom.setBackgroundImage(custom.getBackgroundImage());
			_custom.setUserId(custom.getUserId());
			return new ResponseEntity<>(customRepository.save(_custom), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/customs/{id}")
	public ResponseEntity<HttpStatus> deleteCustom(@PathVariable("id") long id) {
		try {
			customRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/customs")
	public ResponseEntity<HttpStatus> deleteAllCustoms() {
		try {
			customRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}
