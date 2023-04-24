package com.example.bokningsapp.repository.BookingsRepo;

import com.example.bokningsapp.model.bookings.RentalBooking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentalBookingRepository extends JpaRepository <RentalBooking, Long> {

    RentalBooking findById(int id);
}
