package com.example.bokningsapp.repository;

import com.example.bokningsapp.model.Hub;
import com.example.bokningsapp.model.bookings.HubBooking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HubRepository extends JpaRepository<Hub, Integer> {


}
