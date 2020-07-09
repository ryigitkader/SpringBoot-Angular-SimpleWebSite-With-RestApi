package com.yigitk.digitus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
@ServletComponentScan
public class DigitusApplication  {

	/**
	 * @Author Yigit Recep Kader
	 */

	public static void main(String[] args) {
		SpringApplication.run(DigitusApplication.class,args);
	}

}
