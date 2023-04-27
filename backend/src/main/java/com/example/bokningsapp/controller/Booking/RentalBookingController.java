package com.example.bokningsapp.controller.Booking;

import com.example.bokningsapp.dto.HubBookingRequest;
import com.example.bokningsapp.dto.RentalBookingRequest;
import com.example.bokningsapp.enums.BookingStatus;
import com.example.bokningsapp.model.Hub;
import com.example.bokningsapp.model.bookings.HubBooking;
import com.example.bokningsapp.model.bookings.RentalBooking;
import com.example.bokningsapp.repository.BookingsRepo.RentalBookingRepository;
import com.example.bokningsapp.service.RentalService;
import com.example.bokningsapp.service.bookingService.RentalBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
    public ResponseEntity<RentalBooking> placeBooking (@RequestBody RentalBookingRequest bookingRequest){
        RentalBooking booking = rentalBookingService.placeBooking(bookingRequest);
        return ResponseEntity.ok(booking);
    }

    @GetMapping("/allBookings")
    public List<RentalBooking> getAllBookings(){
        return rentalBookingRepository.findAll();
    }

    @GetMapping("/booking/{id}")
    public RentalBooking getThisBooking (@PathVariable int id) {
        return rentalBookingRepository.findRentalBookingById(id);
    }
    @GetMapping("/bookingsOnThisRental/{id}")
    public List <RentalBooking> getAllBookingsOnThisRental (@PathVariable Long id) {
        return rentalBookingService.getAllBookingsOnThisRental(id);
    }

    @PutMapping (value= "/updateBookingStatus/{id}")
    public ResponseEntity<RentalBooking> updateBookingStatus (@PathVariable int id, @RequestBody RentalBooking rentalBooking) {
     RentalBooking updatedBooking = rentalBookingService.updateBookingStatus(id, rentalBooking);
     return ResponseEntity.ok(updatedBooking);
    }


}
