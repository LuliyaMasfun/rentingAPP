package com.example.bokningsapp.controller;

import com.example.bokningsapp.dto.RegistrationRequest;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.repository.UserRepository;
import com.example.bokningsapp.security.BcryptPasswordConfig;
import com.example.bokningsapp.service.RegistrationService;
import com.example.bokningsapp.service.UserService;
import com.example.bokningsapp.token.JwtProvider;
import com.example.bokningsapp.token.JwtResponse;
import com.example.bokningsapp.token.VerificationToken;
import com.example.bokningsapp.token.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.mail.MailSender;

import java.util.Calendar;

public class RegistrationController {
    private final UserService userService;
    private final UserRepository userRepository;

    private JavaMailSender emailSender;

    private AuthenticationManager authenticationManager;

    private JwtTokenUtil jwtTokenUtil;
    private final BcryptPasswordConfig bcryptPasswordConfig;
    private final RegistrationService registrationService;
    private final MailSender mailSender;
    private final JwtProvider jwtProvider;


    @Autowired
    public RegistrationController(UserService userService, UserRepository userRepository, JavaMailSender emailSender, AuthenticationManager authenticationManager, JwtTokenUtil
            jwtTokenUtil, BcryptPasswordConfig bcryptPasswordConfig, RegistrationService registrationService, MailSender mailSender, JwtProvider jwtProvider ) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.emailSender = emailSender;
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.bcryptPasswordConfig = bcryptPasswordConfig;
        this.registrationService = registrationService;
        this.mailSender = mailSender;
        this.jwtProvider = jwtProvider;

    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationRequest registrationRequest) {
        if (userRepository.existsByEmail(registrationRequest.getEmail())) {
            return new ResponseEntity<>("Email Address already in use!", HttpStatus.BAD_REQUEST);
        }

        User user = registrationService.registerUser(registrationRequest);
        userRepository.save(user);

        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(user.getEmail());
            mailMessage.setSubject("Complete Registration!");
            mailMessage.setFrom("noreply@hayal.com");
            mailMessage.setText("To confirm your account, please click here : "
                    + "http://localhost:8080/confirmAccount?token=" + user.getVerificationToken());
            mailSender.send(mailMessage);
            return new ResponseEntity<>("Email sent successfully", HttpStatus.OK);

        }   catch (Exception e) {
            return new ResponseEntity<>( e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/confirmAccount")
    public ResponseEntity<?> confirmUserAccount(@RequestParam("token") String verificationToken) {
        VerificationToken token = registrationService.getVerificationToken(verificationToken);
        if (token == null) {
            return new ResponseEntity<>("Invalid token", HttpStatus.BAD_REQUEST);
        }
        User user = token.getUser();
        Calendar cal = Calendar.getInstance();
        if ((token.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            return new ResponseEntity<>("Token has expired", HttpStatus.BAD_REQUEST);
        }
        userRepository.save(user);
        return new ResponseEntity<>("User confirmed successfully", HttpStatus.OK);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser( @RequestBody RegistrationRequest registrationRequest) {

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            registrationRequest.getEmail(),
                            registrationRequest.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtProvider.generateToken(registrationRequest.getEmail());
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            //Console log
            System.out.println(jwt);

            return ResponseEntity.ok(new JwtResponse(jwt));

        } catch (Exception ex){
            return ResponseEntity.badRequest().body(new ResponseEntity<>("Invalid credentials, please try again", HttpStatus.BAD_REQUEST));
        }
    }
}

