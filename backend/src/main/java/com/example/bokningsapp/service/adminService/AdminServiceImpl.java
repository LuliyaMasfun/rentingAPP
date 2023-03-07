package com.example.bokningsapp.service.adminService;

import com.example.bokningsapp.dto.UpdatedEquipBookingDto;
import com.example.bokningsapp.dto.UpdatedEquipmentDto;
import com.example.bokningsapp.exception.BookingNotFoundException;
import com.example.bokningsapp.exception.EquipmentNotFoundException;
import com.example.bokningsapp.model.Equipment;
import com.example.bokningsapp.model.EquipmentBooking;
import com.example.bokningsapp.repository.EquipBookingRepository;
import com.example.bokningsapp.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class AdminServiceImpl implements AdminService {

    private final EquipBookingRepository equipBookingRepo;
    private final EquipmentRepository equipmentRepo;
   

    @Autowired
    public AdminServiceImpl(EquipBookingRepository equipBookingRepo, EquipmentRepository equipmentRepo) {
        this.equipBookingRepo = equipBookingRepo;
        this.equipmentRepo = equipmentRepo;
    }



}
