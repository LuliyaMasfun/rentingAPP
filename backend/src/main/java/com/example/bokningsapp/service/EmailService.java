package com.example.bokningsapp.service;

import com.example.bokningsapp.model.User;
import org.springframework.stereotype.Service;

@Service
public interface EmailService {

    public void sendVerificationEmail(User user);
}
