package com.yigitk.digitus.service;

import com.yigitk.digitus.exception.DigitusException;
import com.yigitk.digitus.model.NotificationMail;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class MailService {

    private final JavaMailSender mailSender;
    private final MailContentBuilder mailContentBuilder;

    @Async
    public void sendMail(NotificationMail notificationMail) throws DigitusException {

        MimeMessagePreparator messagePreparator = mimeMessage -> {

            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            //messageHelper.setFrom("abcvisitorabc@gmail.com"); // no need
            messageHelper.setTo(notificationMail.getRecipient());
            messageHelper.setSubject(notificationMail.getSubject());
            messageHelper.setText(mailContentBuilder.build(notificationMail.getBody()));

        };

        try {
            mailSender.send(messagePreparator);
            log.info("Activation mail sent");
        }catch (MailException e){

            throw new DigitusException("Exception occured while sending mail to " +notificationMail.getRecipient());

        }

    }
}
