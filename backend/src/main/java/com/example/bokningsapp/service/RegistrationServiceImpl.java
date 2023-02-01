package com.example.bokningsapp.service;

import com.example.bokningsapp.dto.RegistrationRequest;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.repository.UserRepository;
import com.example.bokningsapp.security.BcryptPasswordConfig;
import com.example.bokningsapp.token.VerificationToken;
import com.example.bokningsapp.token.VerificationTokenRepo;
import com.example.bokningsapp.validator.RegistrationRequestValidator;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

public class RegistrationServiceImpl implements RegistrationService {

    private final UserRepository userRepository;
    private final BcryptPasswordConfig bcryptPasswordConfig;
    private final EmailService emailService;
    private final VerificationTokenRepo verificationTokenRepo;
    private final RegistrationRequestValidator registrationRequestValidator;

    public RegistrationServiceImpl(UserRepository userRepository, BcryptPasswordConfig bcryptPasswordConfig, EmailService emailService, VerificationTokenRepo verificationTokenRepo, RegistrationRequestValidator registrationRequestValidator) {
        this.userRepository = userRepository;
        this.bcryptPasswordConfig = bcryptPasswordConfig;
        this.emailService = emailService;
        this.verificationTokenRepo = verificationTokenRepo;
        this.registrationRequestValidator = registrationRequestValidator;
    }

    @Autowired


    @Override
    public User registerUser(RegistrationRequest registrationRequest) {

        boolean isFirstNameValid = registrationRequestValidator.validateFirstName(registrationRequest.getFirstName());
        boolean isLastNameValid = registrationRequestValidator.validateLastName(registrationRequest.getLastName());
        boolean isEmailValid = registrationRequestValidator.validateEmail(registrationRequest.getEmail());
        boolean isPasswordValid = registrationRequestValidator.validatePassword(registrationRequest.getPassword());
        boolean isAddressValid = registrationRequestValidator.validateAddress(registrationRequest.getAddress());
        boolean isPhoneNumberValid = registrationRequestValidator.validatePhoneNumber(registrationRequest.getPhoneNumber());

        if(!isFirstNameValid){
            throw new IllegalStateException("First name is not valid");
        }
        if(!isLastNameValid){
            throw new IllegalStateException("Last name is not valid");
        }
        if(!isPasswordValid){
            throw new IllegalStateException("Password is not valid");
        }
        if(!isEmailValid){
            throw new IllegalStateException("Email is not valid");
        }
        if(!isAddressValid){
            throw new IllegalStateException("Adress is not valid");
        }
        if(!isPhoneNumberValid){
            throw new IllegalStateException("Phone number is not valid");
        }

        User user = new User();
        user.setFirstName(registrationRequest.getFirstName());
        user.setLastName(registrationRequest.getLastName());
        user.setEmail(registrationRequest.getEmail());
        user.setPassword(encryptPassword(registrationRequest.getPassword()));
        user.setBirthDate(registrationRequest.getBirthDate());
        user.setAddress(registrationRequest.getAddress());
        user.setPhoneNumber(registrationRequest.getPhoneNumber());

        User registeredUser = userRepository.save(user);
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setUser(registeredUser);
        verificationToken.setToken(UUID.randomUUID().toString());
        verificationToken.setExpiryDate(calculateExpiryDate(60 * 24)); // expires in 24 hours
        verificationTokenRepo.save(verificationToken);
        return registeredUser;
    }

    @Override
    public VerificationToken getVerificationToken(String token) {
        return verificationTokenRepo.findByToken(token);
    }

    @Override
    public Date calculateExpiryDate(int expiryTimeInMinutes) {
        Calendar cal = Calendar.getInstance();
        long longValue = System.currentTimeMillis();
        Date dateValue = new Date(longValue);
        cal.setTimeInMillis(dateValue.getTime());
        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
        return new Date(cal.getTimeInMillis());
    }

    @Override
    public String encryptPassword(String password) {
        return bcryptPasswordConfig.bCryptPasswordEncoder1().encode(password);   }
}
