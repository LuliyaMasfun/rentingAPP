package com.example.bokningsapp.security.auth;

import com.example.bokningsapp.model.Equipment;
import com.example.bokningsapp.model.User;

import com.example.bokningsapp.security.payload.request.LoginRequest;
import com.example.bokningsapp.security.payload.request.SignupRequest;

import com.example.bokningsapp.security.payload.response.AuthenticationResponse;
import com.example.bokningsapp.repository.UsersRepo.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequiredArgsConstructor
public class AuthenticationController {

   private final AuthenticationService authenticationService;




    @PostMapping("/signup")
    public AuthenticationResponse register(@RequestBody SignupRequest request){
       return authenticationService.register(request);
    }

    @PostMapping("/signin")
    public AuthenticationResponse authenticate(@RequestBody AuthenticationResponse request){
        return authenticationService.authenticateUser(request);
    }

}
