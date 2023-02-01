package com.example.bokningsapp.token;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
    public class JwtProvider {
        private String secretKey = "secret";

        public String generateToken(String username) {
            return Jwts.builder()
                    .setSubject(username)
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    .signWith(SignatureAlgorithm.HS512, secretKey)
                    .compact();
        }

        public String getUsernameFromJwtToken(String token) {
            return Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        }

        public boolean validateJwtToken(String authToken) {
            try {
                Jwts.parser().setSigningKey(secretKey).parseClaimsJws(authToken);
                return true;
            } catch (SignatureException e) {
                return false;
            }
        }
    }
