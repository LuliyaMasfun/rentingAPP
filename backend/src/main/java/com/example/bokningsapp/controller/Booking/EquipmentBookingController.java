package com.example.bokningsapp.controller.Booking;


import com.example.bokningsapp.dto.EquipmentBookingRequest;
import com.example.bokningsapp.model.bookings.EquipmentBooking;
import com.example.bokningsapp.repository.BookingsRepo.EquipBookingRepository;
import com.example.bokningsapp.security.payload.response.BookingResponse;
import com.example.bokningsapp.service.bookingService.EquipmentBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.logging.*;
import java.util.List;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class EquipmentBookingController {

    private static final Logger LOGGER = Logger.getLogger(EquipmentBookingController.class.getName());
    private final EquipmentBookingService bookingService;
    private final EquipBookingRepository equipBookingRepository;

    @Autowired
    public EquipmentBookingController(EquipmentBookingService bookingService, EquipBookingRepository equipBookingRepository) {
        this.bookingService = bookingService;
        this.equipBookingRepository = equipBookingRepository;
    }

    @PostMapping("/bookEquipment")
    public BookingResponse createEquipmentBooking(@RequestBody EquipmentBookingRequest bookingRequest) {
        return bookingService.placeEquipmentBooking(bookingRequest);

        //NEXT STEP: GET CURRENTLY LOGGED IN USER AND ASSOCIATE BOOKING WITH THAT USER
        //VALIDATE BOOKING REQUEST, CHECK FOR AVAILABILITY
    }
    @GetMapping("/getBookingsOnEquipment/{equipmentId}")
    public List<EquipmentBooking> getBookingsForEquipment (@PathVariable int equipmentId) {
        List<EquipmentBooking> booking = equipBookingRepository.findByEquipmentId(equipmentId);
        LOGGER.info("booking" + booking);
        return booking;
    }

    @GetMapping("/allEquipmentBookings")
    public List <EquipmentBooking> getAllEquipmentBookings(){
        List <EquipmentBooking> bookings = equipBookingRepository.findAll();
        return bookings;
    }
}
