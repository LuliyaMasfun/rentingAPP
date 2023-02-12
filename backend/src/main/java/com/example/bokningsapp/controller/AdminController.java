package com.example.bokningsapp.controller;

import com.example.bokningsapp.repository.EquipBookingRepository;
import com.example.bokningsapp.service.adminService.AdminService;
import com.example.bokningsapp.service.bookingService.EquipBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class AdminController {

    private final AdminService adminService;
    private final EquipBookingService equipBookingService;
    private final EquipBookingRepository equipBookingRepo;


    @Autowired
    public AdminController(EquipBookingService equipBookingService, AdminService adminService,  EquipBookingRepository equipBookingRepo) {
        this.equipBookingService = equipBookingService;
        this.adminService = adminService;
        this.equipBookingRepo = equipBookingRepo;
    }

 /*   @PutMapping("/handleBooking/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<EquipmentBooking> handleBookingRequest(@PathVariable int id, @RequestBody UpdatedEquipBookingDto updatedEquipmentBookingDto, UpdatedEquipmentDto updatedEquipmentDto){
        try {
            adminService.handleBookingRequest(id, updatedEquipmentBookingDto, updatedEquipmentDto);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (BookingNotFoundException e) {
            return new ResponseEntity<>( HttpStatus.NOT_FOUND);
        }
        catch (EquipmentNotAvailableException ex) {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/getBookingsByStatus")
    public ResponseEntity<List<EquipmentBooking>> getAllBookings( @RequestParam(required = false) BookingStatus status) {
        List<EquipmentBooking> bookings;
        if(status == null) {
            bookings = equipBookingRepo.findAll();
        } else {
            bookings = equipBookingRepo.findAllByStatus(status);
        }
        if (bookings.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }
    */
}
