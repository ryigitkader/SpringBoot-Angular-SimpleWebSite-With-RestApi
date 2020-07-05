package com.yigitk.digitus.repository;

import com.yigitk.digitus.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IRefreshTokenRepository extends JpaRepository<RefreshToken,Long> {

    Optional<RefreshToken> findByToken(String token);

    void deleteByToken(String token);

}
