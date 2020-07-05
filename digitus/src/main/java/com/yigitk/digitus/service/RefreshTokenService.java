package com.yigitk.digitus.service;

import com.yigitk.digitus.exception.DigitusException;
import com.yigitk.digitus.model.RefreshToken;
import com.yigitk.digitus.repository.IRefreshTokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@AllArgsConstructor
@Transactional
public class RefreshTokenService {

    private final IRefreshTokenRepository refreshTokenRepository;

    public RefreshToken generateRefreshToken(){

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setCreatedDate(Instant.now());

        return refreshTokenRepository.save(refreshToken);
    }


    void validateRefreshToken(String token){
        refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new DigitusException("Invalid refresh token"));
    }

    public void deleteRefreshToken(String token){

        refreshTokenRepository.deleteByToken(token);
    }
}
