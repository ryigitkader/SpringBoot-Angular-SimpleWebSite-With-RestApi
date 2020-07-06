package com.yigitk.digitus.repository;

import com.yigitk.digitus.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User,Long> {


    Optional<User> findByUsername(String name);


    Optional<User> findByEmail(String email);

}
