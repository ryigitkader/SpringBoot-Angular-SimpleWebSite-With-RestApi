package com.yigitk.digitus.repository;

import com.yigitk.digitus.model.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IVerificationTokenRepository extends JpaRepository<VerificationToken,Long> {

}
