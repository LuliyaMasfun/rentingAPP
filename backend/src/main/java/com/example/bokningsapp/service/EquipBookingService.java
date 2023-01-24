package com.example.bokningsapp.service;
import com.example.bokningsapp.dto.EquipBookingDTO;
import com.example.bokningsapp.dto.EquipUpdatedBookingDto;
import com.example.bokningsapp.enums.BookingStatus;
import com.example.bokningsapp.model.EquipmentBooking;
import com.example.bokningsapp.model.User;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface EquipBookingService {
    public EquipmentBooking save(EquipmentBooking equipmentBooking);

    public List<EquipmentBooking> findAllByStatus(BookingStatus status);

    public List<EquipmentBooking> findAll();
    public void updateBooking(int id, EquipUpdatedBookingDto updatedEquipmentBookingDto, User user);

    public EquipmentBooking createBooking(EquipBookingDTO equipBookingDTO);
}
