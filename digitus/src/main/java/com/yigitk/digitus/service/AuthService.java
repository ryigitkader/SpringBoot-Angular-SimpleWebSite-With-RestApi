package com.yigitk.digitus.service;

import com.yigitk.digitus.dto.*;
import com.yigitk.digitus.exception.DigitusException;
import com.yigitk.digitus.model.NotificationMail;
import com.yigitk.digitus.model.User;
import com.yigitk.digitus.model.VerificationToken;
import com.yigitk.digitus.repository.IUserRepository;
import com.yigitk.digitus.repository.IVerificationTokenRepository;
import com.yigitk.digitus.security.JwtProvider;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Service
public class AuthService {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final IVerificationTokenRepository verificationTokenRepository;
    private final MailService mailService;
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final RefreshTokenService refreshTokenService;


    @Transactional
    public void signup(RegisterRequest registerRequest){

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setName(registerRequest.getName());
        user.setSurname(registerRequest.getSurname());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setEmail(registerRequest.getEmail());
        user.setCreatedDate(Instant.now());
        user.setEnabled(false);
        user.setAdmin(false);

        userRepository.save(user);

        String token = generateVerificationToken(user);

        mailService.sendMail(new NotificationMail("Please Activate your account",user.getEmail(),
                "Thank you for signing up to Digitus, " +
                "please click on the below url to activate your account : " +
                "http://localhost:8080/api/auth/accountVerification/"+token+" "));


    }


    public void renewPasswordMail(MailPasswordRequest mailPasswordRequest){


        String token = generateRenewPasswordToken(mailPasswordRequest);
        mailService.sendMail(new NotificationMail("Renew your password",mailPasswordRequest.getMail(),
                "" +
                        "click on the below url to restart your password : " +
                        "http://localhost:8080/api/auth/renewPassword/"+token+" "));


    }

    public void renewPassword(String token, RenewPasswordRequest renewPasswordRequest){


        verifyRenewPassword(token,renewPasswordRequest);
    }


    public void verifyRenewPassword(String token,RenewPasswordRequest renewPasswordRequest) {

        Optional<VerificationToken> verificationToken = verificationTokenRepository.findByToken(token);
        verificationToken.orElseThrow(()->new DigitusException("Invalid token"));
        fetchUserAndEnable(verificationToken.get());
        fetchUserAndRenewPassword(verificationToken.get(),renewPasswordRequest);
    }

    @Transactional
    public void fetchUserAndRenewPassword(VerificationToken verificationToken,RenewPasswordRequest renewPasswordRequest) {

        String username = verificationToken.getUser().getUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new DigitusException("No user found with name - " + username));
        user.setPassword(passwordEncoder.encode(renewPasswordRequest.getPassword()));
        userRepository.save(user);
    }



    private String generateRenewPasswordToken(MailPasswordRequest mailPasswordRequest){

        String token = UUID.randomUUID().toString();
        String email = mailPasswordRequest.getMail();
        Optional<User> userOptional = userRepository.findByEmail(email);
        User user =userOptional.orElseThrow(()->new DigitusException("not found email with - "+email));

        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);

        verificationTokenRepository.save(verificationToken);

        return token;
    }


    private String generateVerificationToken(User user) {

        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);

        verificationTokenRepository.save(verificationToken);

        return token;
    }

    public void verifyAccount(String token) {

        Optional<VerificationToken> verificationToken = verificationTokenRepository.findByToken(token);
        verificationToken.orElseThrow(()->new DigitusException("Invalid token"));
        fetchUserAndEnable(verificationToken.get());
    }

    @Transactional
    public void fetchUserAndEnable(VerificationToken verificationToken) {

        String username = verificationToken.getUser().getUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new DigitusException("No user found with name - " + username));
        user.setEnabled(true);

        userRepository.save(user);
    }





    public AuthenticationResponse login(LoginRequest loginRequest) {

        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authenticate);

        String token = jwtProvider.generateToken(authenticate);

        return AuthenticationResponse.builder()
                .authenticationToken(token)
                .refreshToken(refreshTokenService.generateRefreshToken().getToken())
                .expiresAt(Instant.now().plusMillis(jwtProvider.getJwtExpirationInMillis()))
                .username(loginRequest.getUsername())
                .build();



    }

    public AuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {

        refreshTokenService.validateRefreshToken(refreshTokenRequest.getRefreshToken());
        String token = jwtProvider.generateTokenWithUsername(refreshTokenRequest.getUsername());

        return AuthenticationResponse.builder()
                .authenticationToken(token)
                .refreshToken(refreshTokenRequest.getRefreshToken())
                .expiresAt(Instant.now().plusMillis(jwtProvider.getJwtExpirationInMillis()))
                .username(refreshTokenRequest.getUsername())
                .build();
    }
}
