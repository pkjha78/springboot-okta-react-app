package com.spring.boot.oauth.okta.react.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.spring.boot.oauth.okta.react.app.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
}