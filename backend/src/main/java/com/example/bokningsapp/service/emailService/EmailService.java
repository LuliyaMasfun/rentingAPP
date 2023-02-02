package com.example.bokningsapp.service.emailService;

import com.example.bokningsapp.model.User;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService  implements EmailSender{

    private final static Logger LOGGER = LoggerFactory
            .getLogger(EmailService.class);

    private JavaMailSender mailSender;

    @Override
    @Async
    public void sendVerificationEmail(String toEmail, String contentEmail) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(mimeMessage, "utf-8");
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(toEmail);
            mailMessage.setSubject("Complete Registration!");
            mailMessage.setFrom("luliamasfun1@gmail.com");
            mailSender.send(mailMessage);
        } catch (Exception e) {
            LOGGER.error("failed to send email");
            throw new IllegalStateException("failed to send email");
        }
    }
}
