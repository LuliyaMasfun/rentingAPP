package com.example.bokningsapp.service.bookingService;

import com.example.bokningsapp.dto.BookingRequest;
import com.example.bokningsapp.enums.BookingStatus;
import com.example.bokningsapp.model.Equipment;
import com.example.bokningsapp.model.EquipmentBooking;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.repository.EquipBookingRepository;
import com.example.bokningsapp.repository.EquipmentRepository;
import com.example.bokningsapp.repository.UserRepository;
import com.example.bokningsapp.security.payload.response.BookingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
public class BookingService {
    private final UserRepository userRepository;
    private final EquipBookingRepository equipBookingRepo;

    private final EquipmentRepository equipmentRepo;

    @Autowired
    public BookingService(UserRepository userRepository, EquipBookingRepository equipBookingRepo, EquipmentRepository equipmentRepo) {
        this.userRepository = userRepository;
        this.equipBookingRepo = equipBookingRepo;
        this.equipmentRepo = equipmentRepo;
    }

    public BookingResponse placeEquipmentBooking(BookingRequest bookingRequest) {
        // Create a new booking request
        EquipmentBooking newBooking = new EquipmentBooking();
        User user = userRepository.findById(bookingRequest.getUser().getId()).orElseThrow(() -> new RuntimeException("User not found"));
        Equipment equipment = equipmentRepo.findById(bookingRequest.getEquipment().getId()).orElseThrow(() -> new RuntimeException("Equipment not found"));
        String reservationNumber = UUID.randomUUID().toString();
        newBooking.setUser(user);
        newBooking.setEquipment(equipment);
        newBooking.setStartDate(bookingRequest.getStartDate());
        newBooking.setEndDate(bookingRequest.getEndDate());
        newBooking.setBookingStatus(BookingStatus.PENDING);
        newBooking.setReservationNumber(reservationNumber);
        newBooking.setPickUp(LocalTime.of(12, 0));
        newBooking.setDropOff(LocalTime.of(12, 0));

        equipBookingRepo.save(newBooking);
        // Save the booking to the database
        return BookingResponse.builder()
                .reservationNumber(reservationNumber)
                .bookingStatus(BookingStatus.PENDING)
                .pickUp(LocalTime.of(12, 0))
                .dropOff(LocalTime.of(12, 0))
                .build();

    }

    public boolean isEquipmentAvailable(int equipmentId, LocalDate startDate, LocalDate endDate) {
        // Get the equipment by ID
        Optional<Equipment> equipmentOptional = equipmentRepo.findById(equipmentId);

        if (equipmentOptional.isPresent()) {
            Equipment equipment = equipmentOptional.get();

            // Check if the equipment is available for the requested dates
            for (EquipmentBooking booking : equipment.getEquipmentBooking()) {
                if (startDate.isBefore(booking.getEndDate()) && endDate.isAfter(booking.getStartDate())) {
                    return false;
                }
            }
            return true;
        } else {
            // Equipment not found
            return false;
        }
    }
}
