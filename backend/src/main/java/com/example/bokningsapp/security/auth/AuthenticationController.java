package com.example.bokningsapp.security.auth;


import com.example.bokningsapp.security.payload.request.LoginRequest;
import com.example.bokningsapp.security.payload.request.SignupRequest;

import com.example.bokningsapp.security.payload.response.AuthenticationResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/authentication")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequiredArgsConstructor
public class AuthenticationController {

   private final AuthenticationService authenticationService;




    @PostMapping("/sign-up")
    public AuthenticationResponse register(@RequestBody SignupRequest request){
       return authenticationService.register(request);
    }

    @PostMapping("/sign-in")
    public AuthenticationResponse authenticate(@RequestBody AuthenticationResponse request){
        return authenticationService.authenticateUser(request);
    }

}
