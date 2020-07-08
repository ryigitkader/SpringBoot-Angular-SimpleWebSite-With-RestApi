package com.yigitk.digitus.controller;

import com.yigitk.digitus.dto.*;
import com.yigitk.digitus.service.AuthService;
import com.yigitk.digitus.service.RefreshTokenService;
import com.yigitk.digitus.store.SessionCounter;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;

    private final SessionCounter sessionCounter;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody RegisterRequest registerRequest){

        authService.signup(registerRequest);

        return new ResponseEntity<>("User registration is successfull ", HttpStatus.OK);
    }

    @PostMapping("/adminSignup")
    public ResponseEntity<String> adminSignup(@RequestBody RegisterRequest registerRequest){

        authService.adminSignup(registerRequest);
        return new ResponseEntity<>("Admin registration is successfull ", HttpStatus.OK);
    }


    @GetMapping("accountVerification/{token}")
    public ResponseEntity<String> verifyAccount(@PathVariable String token){

        authService.verifyAccount(token);

        return new ResponseEntity<>("Account activated successfully",HttpStatus.OK);
    }


    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody LoginRequest loginRequest){

        return authService.login(loginRequest);

    }

    @PostMapping("/renewPassword/{token}")
    public ResponseEntity<String> renewPassword(@PathVariable String token, @RequestBody RenewPasswordRequest renewPasswordRequest){

        authService.renewPassword(token,renewPasswordRequest);

        return new ResponseEntity<>("Password reset with new password ", HttpStatus.OK);
    }

    @PostMapping("/renewPasswordMail")
    public ResponseEntity<String> renewMailPassword(@RequestBody MailPasswordRequest mailPasswordRequest){

        authService.renewPasswordMail(mailPasswordRequest);

        return new ResponseEntity<>("Reset password mail sent ", HttpStatus.OK);
    }




    @PostMapping("refresh/token")
    public AuthenticationResponse refreshTokens(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest){

        return authService.refreshToken(refreshTokenRequest);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest){

        refreshTokenService.deleteRefreshToken(refreshTokenRequest.getRefreshToken());

        return ResponseEntity.status(HttpStatus.OK).body("Refresh token deleted successfully");
    }


    @GetMapping("/logged")
    public int loggedUsers(){

        return sessionCounter.getActiveSessionNumber();
    }

    @GetMapping("/notactivateuser")
    public int notActivateUser(){

        return authService.notActivatedUser();
    }




}
