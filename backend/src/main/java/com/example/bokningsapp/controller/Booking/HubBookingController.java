package com.example.bokningsapp.controller.Booking;

import com.example.bokningsapp.dto.HubBookingRequest;
import com.example.bokningsapp.model.Hub;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.model.bookings.EquipmentBooking;
import com.example.bokningsapp.model.bookings.HubBooking;
import com.example.bokningsapp.repository.HubBookingRepository;
import com.example.bokningsapp.repository.HubRepository;
import com.example.bokningsapp.repository.UserRepository;
import com.example.bokningsapp.security.jwt.JwtService;
import com.example.bokningsapp.service.bookingService.HubBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class HubBookingController {

   private final HubBookingService hubBookingService;
   private final UserRepository userRepository;
   private final HubBookingRepository hubBookingRepository;
   private final HubRepository hubRepository;

    @Autowired
    public HubBookingController(HubBookingService hubBookingService, UserRepository userRepository, HubBookingRepository hubBookingRepository, HubRepository hubRepository) {
        this.hubBookingService = hubBookingService;
        this.userRepository  = userRepository;
        this.hubBookingRepository = hubBookingRepository;
        this.hubRepository = hubRepository;
    }

    @PostMapping("/placeHubBooking")
    public ResponseEntity<?> placeHubBooking (@RequestBody HubBookingRequest bookingRequest){
        hubBookingService.placeHubBooking(bookingRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/allHubBookings")
    public List<HubBooking> getAllHubBookings(){
        return hubBookingRepository.findAll();
    }

    @GetMapping("/hubBooking/{id}")
    public HubBooking getThisHubBooking (@PathVariable int id) {
        return hubBookingRepository.findById(id);
    }


}

