package com.example.bokningsapp.service.emailService;

import com.example.bokningsapp.model.User;
import org.springframework.stereotype.Component;


public interface EmailSender{
    void sendVerificationEmail(String toEmail, String email);;
}
