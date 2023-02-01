package com.example.bokningsapp.controller;


import com.example.bokningsapp.dto.UpdatedEquipBookingDto;
import com.example.bokningsapp.exception.BookingNotFoundException;
import com.example.bokningsapp.exception.EquipmentNotAvailableException;
import com.example.bokningsapp.exception.UnauthorizedUserException;
import com.example.bokningsapp.model.EquipmentBooking;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.repository.EquipBookingRepo;
import com.example.bokningsapp.service.bookingService.EquipBookingService;
import com.example.bokningsapp.token.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000",maxAge = 3600)
public class EquipBookingController {
    private final EquipBookingService equipBookingService;

    private final EquipBookingRepo equipBookingRepo;
   private final JwtTokenUtil jwtTokenUtil;


    @Autowired
    public EquipBookingController(EquipBookingService equipBookingService, EquipBookingRepo equipBookingRepo, JwtTokenUtil jwtTokenUtil) {
        this.equipBookingService = equipBookingService;
        this.equipBookingRepo = equipBookingRepo;
        this.jwtTokenUtil = jwtTokenUtil;
    }
    @PostMapping("/createBooking")
    public ResponseEntity<EquipmentBooking>createBooking(@RequestBody EquipmentBooking equipmentBooking){
        try {
            EquipmentBooking newBooking = equipBookingService.createBooking(equipmentBooking);
            return new ResponseEntity<>(equipmentBooking,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/updateBooking/{id}")
    public ResponseEntity<EquipmentBooking> updateBooking(@PathVariable int id, @RequestBody UpdatedEquipBookingDto updatedEquipmentBookingDto, @AuthenticationPrincipal User user) {
        try {
          equipBookingService.updateBooking(id, updatedEquipmentBookingDto, user);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (BookingNotFoundException e) {
            return new ResponseEntity<>( HttpStatus.NOT_FOUND);
        } catch (UnauthorizedUserException e) {
            return new ResponseEntity<>( HttpStatus.UNAUTHORIZED);
        }
        catch (EquipmentNotAvailableException ex) {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/allBookings")
    public ResponseEntity<List<EquipmentBooking>> getAllBookings(){
        List<EquipmentBooking> bookings = equipBookingService.findAllBookings();
        bookings.sort((b1, b2) -> b2.getStartDate().compareTo(b1.getStartDate()));
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @DeleteMapping(value = "deleteBooking/{id}")
    @CrossOrigin
    public ResponseEntity<?> deleteBooking(@PathVariable int id) {
        try {
            equipBookingService.deleteBooking(id);
            return new ResponseEntity<>("Booking deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting vooking: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/bookings/recent")
    public ResponseEntity<EquipmentBooking> getRecentBooking(@RequestHeader("Authorization") String token) {
        // get the user's id from the JWT token
        Long userId = jwtTokenUtil.getUserIdFromToken(token);

        // find the user's bookings
        List<EquipmentBooking> userBookings = equipBookingRepo.findByUserId(userId);

        // sort  bookings by date ascending
        userBookings.sort(Comparator.comparing(EquipmentBooking::getStartDate));

        // get the most recent booking
        EquipmentBooking mostRecentBooking = null;
        for (EquipmentBooking booking : userBookings) {
            if (booking.getStartDate().isAfter(LocalDate.now())) {
                mostRecentBooking = booking;
                break;
            }
        }
        return new ResponseEntity<>(mostRecentBooking, HttpStatus.OK);
    }


    @GetMapping("/getBookingsOnEquipment/{equipId}")
    public ResponseEntity<List<EquipmentBooking>> getBookingsOnEquipment(@PathVariable int equipId){
        List<EquipmentBooking> bookings = equipBookingService.findAllByEquipmentId(equipId);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }
}
