package com.example.bokningsapp.security.auth;

import com.example.bokningsapp.security.payload.request.LoginRequest;
import com.example.bokningsapp.security.payload.request.SignupRequest;
import com.example.bokningsapp.security.payload.response.AuthenticationResponse;
import com.example.bokningsapp.repository.UsersRepo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class AuthenticationController {

    private final AuthenticationService service;
private final UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody SignupRequest request){
       return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody LoginRequest request){
        return ResponseEntity.ok(service.authenticate(request));
    }

}
