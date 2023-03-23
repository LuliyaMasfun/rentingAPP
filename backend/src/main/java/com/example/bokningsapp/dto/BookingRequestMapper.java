package com.example.bokningsapp.dto;

import com.example.bokningsapp.model.Equipment;
import com.example.bokningsapp.model.bookings.EquipmentBooking;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.repository.EquipmentRepository;
import com.example.bokningsapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BookingRequestMapper {

    private final UserRepository userRepository;
    private final EquipmentRepository equipmentRepository;

    @Autowired
    public BookingRequestMapper(UserRepository userRepository, EquipmentRepository equipmentRepository) {
        this.userRepository = userRepository;
        this.equipmentRepository = equipmentRepository;
    }

    public EquipmentBooking toEntity(EquipmentBookingRequest bookingRequest) {
        EquipmentBooking equipmentBooking = new EquipmentBooking();
        User user = userRepository.findById(bookingRequest.getUser().getId()).orElseThrow(() -> new RuntimeException("User not found"));
        Equipment equipment = equipmentRepository.findById(bookingRequest.getEquipment().getId()).orElseThrow(() -> new RuntimeException("Equipment not found"));
        equipmentBooking.setUser(user);
        equipmentBooking.setEquipment(equipment);
        equipmentBooking.setStartDate(bookingRequest.getStartDate());
        equipmentBooking.setEndDate(bookingRequest.getEndDate());
        return equipmentBooking;
    }
}
