package com.example.bokningsapp.token;

import com.example.bokningsapp.token.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

public interface VerificationTokenRepo extends JpaRepository <VerificationToken, Long> {

   Optional<VerificationToken>findByToken(String token);

    @Transactional
    @Modifying
    @Query("UPDATE VerificationToken v " +
            "SET v.confirmedAt = ?2 " +
            "WHERE v.token = ?1")
    int updateConfirmedAt(String token,
                          LocalDateTime confirmedAt);
}
