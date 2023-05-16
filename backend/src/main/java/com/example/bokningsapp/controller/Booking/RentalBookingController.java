package com.example.bokningsapp.controller.Booking;

import com.example.bokningsapp.dto.RentalBookingRequest;
import com.example.bokningsapp.model.Hub;
import com.example.bokningsapp.model.Rental;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.model.bookings.RentalBooking;
import com.example.bokningsapp.repository.BookingsRepo.RentalBookingRepository;
import com.example.bokningsapp.repository.RentalsRepo.RentalRepository;
import com.example.bokningsapp.repository.UsersRepo.UserRepository;
import com.example.bokningsapp.service.RentalService;
import com.example.bokningsapp.service.bookingService.RentalBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/bookingsV2")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class RentalBookingController {

    private final RentalService rentalService;
    private final RentalBookingRepository rentalBookingRepository;
    private final RentalBookingService rentalBookingService;
    private final RentalRepository rentalRepository;
    private final UserRepository userRepository;

    @Autowired
    public RentalBookingController(RentalService rentalService, RentalBookingRepository rentalBookingRepository, RentalBookingService rentalBookingService, RentalRepository rentalRepository,  UserRepository userRepository) {
        this.rentalService = rentalService;
        this.rentalBookingRepository = rentalBookingRepository;
        this.rentalBookingService = rentalBookingService;
        this.rentalRepository = rentalRepository;
        this.userRepository = userRepository;
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
    @GetMapping("/bookingsOnThisUser/{id}")
    public List <RentalBooking> getAllBookingsOnThisUser (@PathVariable Long id) {
        return rentalBookingRepository.findAllByUserId(id);
    }

    @PutMapping (value= "/updateBookingStatus/{id}")
    public ResponseEntity<RentalBooking> updateBookingStatus (@PathVariable int id, @RequestBody RentalBooking rentalBooking) {
     RentalBooking updatedBooking = rentalBookingService.updateBookingStatus(id, rentalBooking);
     return ResponseEntity.ok(updatedBooking);
    }

    //TRYING TO RETRIVE RUNTIMEEXCEPTIONS THROWN IN SERVERSIDE TO FRONTEND
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException ex) {
        ErrorResponse errorResponse = new ErrorResponse() {
            @Override
            public HttpStatusCode getStatusCode() {
                return null;
            }

            @Override
            public ProblemDetail getBody() {
                return null;
            }
        };
        //errorResponse.setMessage(ex.getMessage()); // Set the message to the exception's message
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
