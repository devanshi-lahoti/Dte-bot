package com.chat.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chat.entity.Activity;
import com.chat.entity.College;
import com.chat.entity.User;

@Repository
public interface CollegeSavedRepository extends JpaRepository<College, Long> {
    List<Activity> findByUser(User user);

	College save(College college);

	long countByUser(User user);
	
	 List<College> findByLocationContainingIgnoreCase(String location);
	   


		List<College> findAll();

		Optional<College> findById(int id);

		

		


}
