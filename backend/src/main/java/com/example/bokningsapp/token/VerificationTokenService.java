package com.example.bokningsapp.token;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class VerificationTokenService {

    private final VerificationTokenRepo verificationTokenRepo;

    @Autowired
    public VerificationTokenService(VerificationTokenRepo verificationTokenRepo) {
        this.verificationTokenRepo = verificationTokenRepo;
    }

    public void saveConfirmationToken(VerificationToken verificationToken) {
        verificationTokenRepo.save(verificationToken);
    }

    public Optional<VerificationToken> getToken(String token) {
        return verificationTokenRepo.findByToken(token);
    }

    public int setConfirmedAt(String token) {
        return verificationTokenRepo.updateConfirmedAt(
                token, LocalDateTime.now());
    }
}
