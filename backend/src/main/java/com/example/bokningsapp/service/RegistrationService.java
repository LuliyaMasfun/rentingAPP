package com.example.bokningsapp.service;

import com.example.bokningsapp.dto.RegistrationRequest;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.token.VerificationToken;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public interface RegistrationService {
    public User registerUser(RegistrationRequest signUpRequest);
    public String encryptPassword(String password);
    public VerificationToken getVerificationToken(String token);
    public Date calculateExpiryDate(int expiryTimeInMinutes);

}
