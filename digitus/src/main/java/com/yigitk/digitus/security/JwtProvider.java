package com.yigitk.digitus.security;


import com.yigitk.digitus.exception.DigitusException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.security.*;
import java.security.cert.CertificateException;
import java.time.Instant;
import java.util.Date;

@Service
@Data
public class JwtProvider {


    private KeyStore keyStore;

    @Value("${jwt.expiration.time}")
    private Long jwtExpirationInMillis;

    @PostConstruct
    public void init(){
        try {

            keyStore = KeyStore.getInstance("JKS");
            InputStream resourceAsStream = getClass().getResourceAsStream("/springngblog.jks");
            keyStore.load(resourceAsStream,"springblog".toCharArray());


        }catch (KeyStoreException | CertificateException | NoSuchAlgorithmException | IOException e){

            throw new DigitusException("Exception occured while loading keystore");

        }
    }



    public String generateToken(Authentication authentication){

        User principal = (org.springframework.security.core.userdetails.User)authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(principal.getUsername())
                .signWith(getPrivateKey())
                .setExpiration(Date.from(Instant.now().plusMillis(jwtExpirationInMillis)))
                .compact();

    }

    public String generateTokenWithUsername(String username){

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(Date.from(Instant.now()))
                .signWith(getPrivateKey())
                .setExpiration(Date.from(Instant.now().plusMillis(jwtExpirationInMillis)))
                .compact();

    }


    private PrivateKey getPrivateKey() throws DigitusException {
        try {
            return (PrivateKey)keyStore.getKey("springngblog","springblog".toCharArray());
        }catch (KeyStoreException | NoSuchAlgorithmException | UnrecoverableKeyException e){
            throw new DigitusException("Exception occured while retrieving public key from keystore");
        }

    }


    public boolean validateToken(String jwt){

        Jwts.parserBuilder().setSigningKey(getPublicKey()).build().parseClaimsJws(jwt);

        return true;
    }

    private PublicKey getPublicKey(){

        try {

            return keyStore.getCertificate("springngblog").getPublicKey();
        }catch (KeyStoreException e){

            throw new DigitusException("Exception occured while " +
                    "retrieving public key from keystore");

        }
    }

    public String getUsernameFromJwt(String token){


        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getPublicKey())
                .build()
                .parseClaimsJws(token)
                .getBody();


        return claims.getSubject();


    }
}
