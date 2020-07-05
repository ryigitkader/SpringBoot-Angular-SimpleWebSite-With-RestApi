package com.yigitk.digitus.service;

import com.yigitk.digitus.exception.DigitusException;
import com.yigitk.digitus.model.User;
import com.yigitk.digitus.repository.IUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final IUserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> userOptional = userRepository.findByUsername(username);
        User user = userOptional.orElseThrow(() -> new DigitusException("No username found with - "+username));

        return new org.springframework.security.core.userdetails.User(user.getUsername(),user.getPassword(),user.isEnabled(),
                true,true,true,getAuthorities("USER"));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(String role) {

        return Collections.singletonList(new SimpleGrantedAuthority(role));

    }
}
