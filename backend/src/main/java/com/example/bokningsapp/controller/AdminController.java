package com.example.bokningsapp.controller;

import com.example.bokningsapp.enums.BookingStatus;
import com.example.bokningsapp.model.EquipmentBooking;
import com.example.bokningsapp.repository.EquipBookingRepo;
import com.example.bokningsapp.service.EquipBookingService;
import com.example.bokningsapp.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final EquipBookingService equipBookingService;
    private final EquipmentService equipmentService;
    private final EquipBookingRepo equipBookingRepo;

    @Autowired
    public AdminController(EquipBookingService equipBookingService, EquipmentService equipmentService,  EquipBookingRepo equipBookingRepo) {
        this.equipBookingService = equipBookingService;
        this.equipmentService = equipmentService;
        this.equipBookingRepo = equipBookingRepo;
    }

    @PutMapping("/handleBooking/{id}/status")
    public ResponseEntity<EquipmentBooking> updateBookingStatus (@PathVariable int id, @RequestBody BookingStatus bookingStatus){

       EquipmentBooking equipmentBooking = equipBookingRepo.findById(id).orElseThrow();

        if(equipmentBooking == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        equipmentBooking.setBookingStatus(equipmentBooking.getBookingStatus());
        equipmentBooking = equipBookingService.save(equipmentBooking);
        return new ResponseEntity<>(equipmentBooking, HttpStatus.OK);

    }

    @GetMapping("/getBookingsByStatus")
    public ResponseEntity<List<EquipmentBooking>> getAllBookings( @RequestParam(required = false) BookingStatus status) {
        List<EquipmentBooking> bookings;
        if(status == null) {
            bookings = equipBookingService.findAll();
        } else {
            bookings = equipBookingService.findAllByStatus(status);
        }
        if (bookings.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }
}
