package com.example.bokningsapp.service.registrationService;

import com.example.bokningsapp.dto.RegistrationRequest;
import com.example.bokningsapp.token.VerificationToken;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public interface RegistrationService {
    public String registerUser(RegistrationRequest registrationRequest);
    public String encryptPassword(String password);
    public Date calculateExpiryDate(int expiryTimeInMinutes);
    public String confirmToken(String token);

}
