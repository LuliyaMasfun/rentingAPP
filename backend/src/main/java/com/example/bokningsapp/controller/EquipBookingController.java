package com.example.bokningsapp.controller;


import com.example.bokningsapp.dto.EquipBookingDto;
import com.example.bokningsapp.dto.UpdatedEquipBookingDto;
import com.example.bokningsapp.enums.EquipmentType;
import com.example.bokningsapp.exception.BookingNotFoundException;
import com.example.bokningsapp.exception.EquipmentNotAvailableException;
import com.example.bokningsapp.exception.UnauthorizedUserException;
import com.example.bokningsapp.model.EquipmentBooking;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.repository.EquipBookingRepo;
import com.example.bokningsapp.repository.EquipmentRepo;
import com.example.bokningsapp.service.EquipBookingService;
import com.example.bokningsapp.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000",maxAge = 3600)
@RestController
public class EquipBookingController {
    private final EquipBookingService equipBookingService;
    private final EquipmentService equipmentService;
    private EquipBookingRepo equipBookingRepo;
    private EquipmentRepo equipmentRepo;


    @Autowired
    public EquipBookingController(EquipBookingService equipBookingService, EquipmentService equipmentService, EquipBookingRepo equipBookingRepo, EquipmentRepo equipmentRepo) {
        this.equipBookingService = equipBookingService;
        this.equipmentService = equipmentService;
        this.equipmentRepo = equipmentRepo;
        this.equipBookingRepo = equipBookingRepo;
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
}
