package com.example.bokningsapp.repository;

import com.example.bokningsapp.dto.HubBookingRequest;
import com.example.bokningsapp.model.Hub;
import com.example.bokningsapp.model.bookings.HubBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HubBookingRepository extends JpaRepository <HubBooking, Integer> {

    HubBooking findById(int id);
    List<HubBooking> findAllByHubId( Long id);

}
