package com.backend.mongo.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.mongo.repository.Taskrepos;
import com.backend.mongo.student.taskmodel;

@RestController
@CrossOrigin(origins = "*")
public class controller {
	
	@Autowired
	private Taskrepos repository;
	
	@PostMapping("/create")
	public List<taskmodel> createTask(@RequestBody taskmodel task) {
		repository.insert(task);
		return repository.findAll();
	}
	
	
	@GetMapping("/upd/{id}")
	public List<taskmodel> update1(@PathVariable String id) {
		 taskmodel test = repository.findById(id).orElseThrow();
		 test.setDone(!test.isDone());
		 repository.save(test);
		 return repository.findAll();
	}
	
	@GetMapping("/delete/{id}")
	public List<taskmodel> update(@PathVariable String id) {
		repository.deleteById(id);
		return repository.findAll();
	}
	
	@GetMapping("/list")
	public List<taskmodel> searchTask() {
		return repository.findAll();
	}

}
