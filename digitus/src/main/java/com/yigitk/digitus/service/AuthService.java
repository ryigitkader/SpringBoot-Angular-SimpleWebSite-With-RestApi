package com.yigitk.digitus.service;

import com.yigitk.digitus.dto.RegisterRequest;
import com.yigitk.digitus.model.NotificationMail;
import com.yigitk.digitus.model.User;
import com.yigitk.digitus.model.VerificationToken;
import com.yigitk.digitus.repository.IUserRepository;
import com.yigitk.digitus.repository.IVerificationTokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@AllArgsConstructor
@Service
public class AuthService {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final IVerificationTokenRepository verificationTokenRepository;
    private final MailService mailService;

    @Transactional
    public void signup(RegisterRequest registerRequest){

        User user = new User();
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

    private String generateVerificationToken(User user) {

        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);

        verificationTokenRepository.save(verificationToken);

        return token;
    }

}
