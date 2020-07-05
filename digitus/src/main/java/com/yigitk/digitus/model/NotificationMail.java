package com.yigitk.digitus.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationMail {

    private String subject;
    private String recipient;
    private String body;
}
