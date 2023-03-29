package com.example.bokningsapp.service.emailService;

import com.example.bokningsapp.service.activationTokenService.ActivationTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private JavaMailSender emailSender;

    private ActivationTokenService activationTokenService;

    @Autowired
    public EmailService(JavaMailSender emailSender, ActivationTokenService activationTokenService) {
        this.emailSender = emailSender;
        this.activationTokenService = activationTokenService;
    }


    
}
