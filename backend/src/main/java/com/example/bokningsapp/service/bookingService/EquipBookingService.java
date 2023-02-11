package com.example.bokningsapp.service.bookingService;
import com.example.bokningsapp.dto.EquipBookingDto;
import com.example.bokningsapp.dto.UpdatedEquipBookingDto;
import com.example.bokningsapp.enums.BookingStatus;
import com.example.bokningsapp.model.EquipmentBooking;
import com.example.bokningsapp.model.User;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface EquipBookingService {
    public EquipmentBooking save(EquipmentBooking equipmentBooking);

    public List<EquipmentBooking> findAllByStatus(BookingStatus status);

    public EquipmentBooking updateBooking(int bookingId, UpdatedEquipBookingDto updatedEquipmentBookingDto, User user);

    public EquipmentBooking createBooking(EquipmentBooking equipmentBooking);
    public void deleteBooking(int id);
    public List<EquipmentBooking> findAllBookings();

    public List<EquipmentBooking> findAllByEquipmentId(int equipmentId);

}
