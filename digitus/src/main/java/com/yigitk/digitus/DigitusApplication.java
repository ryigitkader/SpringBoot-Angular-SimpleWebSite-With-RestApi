package com.yigitk.digitus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class DigitusApplication {

	public static void main(String[] args) {
		SpringApplication.run(DigitusApplication.class, args);
	}

}
