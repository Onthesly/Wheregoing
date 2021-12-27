package com.bit.wheregoing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bit.wheregoing.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByName(String name);
    Optional<User> findByEmail(String email);
    
//    User findByEmail(String email);
//	User findByName(String name);
//	User findByEmail(String email);
    Boolean existsByEmail(String email);
    Boolean existsByName(String name);
//	User findUserByUserId(String userEmail);

}
