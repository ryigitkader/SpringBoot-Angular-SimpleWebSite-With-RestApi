package com.yigitk.digitus.repository;

import com.yigitk.digitus.model.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IVerificationTokenRepository extends JpaRepository<VerificationToken,Long> {

    Optional<VerificationToken> findByToken(String token);

}
