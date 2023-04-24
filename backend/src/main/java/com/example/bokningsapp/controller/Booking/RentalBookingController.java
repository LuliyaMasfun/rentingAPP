package com.example.bokningsapp.controller.Booking;

import com.example.bokningsapp.dto.HubBookingRequest;
import com.example.bokningsapp.dto.RentalBookingRequest;
import com.example.bokningsapp.model.bookings.HubBooking;
import com.example.bokningsapp.model.bookings.RentalBooking;
import com.example.bokningsapp.repository.BookingsRepo.RentalBookingRepository;
import com.example.bokningsapp.service.RentalService;
import com.example.bokningsapp.service.bookingService.RentalBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookingsV2")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class RentalBookingController {

    private final RentalService rentalService;
    private final RentalBookingRepository rentalBookingRepository;
    private final RentalBookingService rentalBookingService;

    @Autowired
    public RentalBookingController(RentalService rentalService, RentalBookingRepository rentalBookingRepository, RentalBookingService rentalBookingService) {
        this.rentalService = rentalService;
        this.rentalBookingRepository = rentalBookingRepository;
        this.rentalBookingService = rentalBookingService;
    }

    @PostMapping("/placeBooking")
    public ResponseEntity<?> placeBooking (@RequestBody RentalBookingRequest bookingRequest){
        rentalBookingService.placeBooking(bookingRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/allBookings")
    public List<RentalBooking> getAllBookings(){
        return rentalBookingRepository.findAll();
    }

    @GetMapping("/booking/{id}")
    public RentalBooking getThisBooking (@PathVariable int id) {
        return rentalBookingRepository.findById(id);
    }

}
