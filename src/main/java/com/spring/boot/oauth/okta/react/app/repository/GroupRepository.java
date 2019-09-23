package com.spring.boot.oauth.okta.react.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.spring.boot.oauth.okta.react.app.model.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
	Group findByName(String name);

	List<Group> findAllByUserId(String id);
	
}