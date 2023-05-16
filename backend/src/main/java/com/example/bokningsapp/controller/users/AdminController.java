package com.example.bokningsapp.controller.users;

import com.example.bokningsapp.repository.BookingsRepo.EquipBookingRepository;
import com.example.bokningsapp.service.adminService.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class AdminController {

    private final AdminService adminService;
    private final EquipBookingRepository equipBookingRepo;


    @Autowired
    public AdminController( AdminService adminService,  EquipBookingRepository equipBookingRepo) {
        this.adminService = adminService;
        this.equipBookingRepo = equipBookingRepo;
    }
  //METHOD HANDLE BOOKING, STATUS OF BOOKING
    // METHOD GET ALL BOOKINGS BY STATUS
}
