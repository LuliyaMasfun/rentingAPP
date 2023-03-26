package com.example.bokningsapp.service.bookingService;

import com.example.bokningsapp.dto.HubBookingRequest;
import com.example.bokningsapp.enums.BookingStatus;
import com.example.bokningsapp.model.Hub;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.model.bookings.HubBooking;
import com.example.bokningsapp.repository.HubBookingRepository;
import com.example.bokningsapp.repository.HubRepository;
import com.example.bokningsapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class HubBookingService {

    private final UserRepository userRepository;
    private final HubRepository hubRepository;
    private final HubBookingRepository hubBookingRepository;

    @Autowired
    public HubBookingService(UserRepository userRepository, HubRepository hubRepository, HubBookingRepository hubBookingRepository) {
        this.userRepository = userRepository;
        this.hubRepository = hubRepository;
        this.hubBookingRepository = hubBookingRepository;
    }


    public void placeHubBooking (HubBookingRequest bookingRequest) {

        HubBooking newBooking = new HubBooking();
        String bookingNumber = UUID.randomUUID().toString().substring(0, 8);
        User user = userRepository.findById(bookingRequest.getUser().getId()).orElseThrow(() -> new RuntimeException("User not found"));
        Hub hub = hubRepository.findById(bookingRequest.getHub().getId()).orElseThrow(() -> new RuntimeException("Hub not found"));
        newBooking.setUser(user);
        newBooking.setHub(hub);
        newBooking.setStartDate(bookingRequest.getStartDate());
        newBooking.setEndDate(bookingRequest.getEndDate());
        newBooking.setBookingNumber(bookingNumber);
        newBooking.setPickUp(bookingRequest.getPickUp());
        newBooking.setDropOff(bookingRequest.getDropOff());
        newBooking.setBookingStatus(BookingStatus.PENDING);
        newBooking.setCreatedOn(LocalDateTime.now());

        hubBookingRepository.save(newBooking);

        //TO-DO VALIDERA BOKNINGEN

    }
}
