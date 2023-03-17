package com.example.bokningsapp.service.bookingService;

import com.example.bokningsapp.dto.BookingRequest;
import com.example.bokningsapp.dto.BookingRequestMapper;
import com.example.bokningsapp.enums.BookingStatus;
import com.example.bokningsapp.model.Equipment;
import com.example.bokningsapp.model.EquipmentBooking;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.repository.EquipBookingRepository;
import com.example.bokningsapp.repository.EquipmentRepository;
import com.example.bokningsapp.repository.UserRepository;
import com.example.bokningsapp.security.payload.response.BookingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.UUID;

@Service
public class BookingService {
    private final UserRepository userRepository;
    private final EquipBookingRepository equipBookingRepo;
    private final EquipmentRepository equipmentRepo;

    private final BookingRequestMapper bookingRequestMapper;


    @Autowired
    public BookingService(UserRepository userRepository, EquipBookingRepository equipBookingRepo, EquipmentRepository equipmentRepo, BookingRequestMapper bookingRequestMapper) {
        this.userRepository = userRepository;
        this.equipBookingRepo = equipBookingRepo;
        this.equipmentRepo = equipmentRepo;
        this.bookingRequestMapper= bookingRequestMapper;
    }

    public BookingResponse placeEquipmentBooking (BookingRequest bookingRequest) {
        // Create a new booking request
        EquipmentBooking newBooking = new EquipmentBooking();
        User user = userRepository.findById(bookingRequest.getUser().getId()).orElseThrow(() -> new RuntimeException("User not found"));
        Equipment equipment = equipmentRepo.findById(bookingRequest.getEquipment().getId()).orElseThrow(() -> new RuntimeException("Equipment not found"));
        newBooking.setUser(user);
        newBooking.setEquipment(equipment);
        newBooking.setStartDate(bookingRequest.getStartDate());
        newBooking.setEndDate(bookingRequest.getEndDate());

        String reservationNumber = UUID.randomUUID().toString();
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

}
