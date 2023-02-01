package com.example.bokningsapp.controller;

import com.example.bokningsapp.dto.RegistrationRequest;
import com.example.bokningsapp.service.registrationService.RegistrationService;
import com.example.bokningsapp.token.VerificationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

public class RegistrationController {
    private final RegistrationService registrationService;
    @Autowired
    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }


    @PostMapping("/signup")
    public VerificationToken register(@RequestBody RegistrationRequest request) {
        return registrationService.registerUser(request);
    }

    @GetMapping("/confirmAccount")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }
}

