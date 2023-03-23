package com.example.bokningsapp.controller.Booking;

import com.example.bokningsapp.dto.HubBookingRequest;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.repository.UserRepository;
import com.example.bokningsapp.security.jwt.JwtService;
import com.example.bokningsapp.service.bookingService.HubBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class HubBookingController {

   private final HubBookingService hubBookingService;
   private final UserRepository userRepository;

    @Autowired
    public HubBookingController(HubBookingService hubBookingService, UserRepository userRepository) {
        this.hubBookingService = hubBookingService;
        this.userRepository  = userRepository;
    }

    @PostMapping("/placeHubBooking")
    public ResponseEntity<?> placeHubBooking (@RequestBody HubBookingRequest bookingRequest, @RequestHeader("Authorization") String authHeader){
        Long userId = JwtService.getUserIdFromToken(authHeader);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        bookingRequest.setUser(user);
        hubBookingService.placeHubBooking(bookingRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
