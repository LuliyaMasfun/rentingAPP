package com.example.bokningsapp.controller;

import com.example.bokningsapp.enums.BookingStatus;
import com.example.bokningsapp.model.Equipment;
import com.example.bokningsapp.model.EquipmentBooking;
import com.example.bokningsapp.dto.BookingRequest;
import com.example.bokningsapp.security.payload.response.BookingResponse;
import com.example.bokningsapp.service.bookingService.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class BookingController {

    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/bookEquipment")
    public ResponseEntity <BookingResponse> createEquipmentBooking(@RequestBody BookingRequest bookingRequest) {
        return ResponseEntity.ok(bookingService.placeEquipmentBooking(bookingRequest));
              
    }
}
