package com.example.bokningsapp.repository;

import com.example.bokningsapp.model.Hub;
import com.example.bokningsapp.model.bookings.HubBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HubRepository extends JpaRepository<Hub, Long> {


}
