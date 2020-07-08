package com.yigitk.digitus.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "user name is required")
    private String username;

    @NotBlank(message = "name is required")
    private String name;

    @NotBlank(message = "surname is required")
    private String surname;

    @NotBlank(message = "last name is required")
    private String password;

    @Email
    @NotEmpty(message = "Email is required")
    private String email;

    private Instant createdDate;

    private Instant activatedDate;

    private Instant firstLogin;

    private boolean enabled;

    private boolean admin;


}
