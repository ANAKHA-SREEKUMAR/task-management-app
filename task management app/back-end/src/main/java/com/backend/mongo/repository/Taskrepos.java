package com.backend.mongo.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.backend.mongo.student.taskmodel;

@Repository
public interface Taskrepos extends MongoRepository <taskmodel,String> {
	
	
}
