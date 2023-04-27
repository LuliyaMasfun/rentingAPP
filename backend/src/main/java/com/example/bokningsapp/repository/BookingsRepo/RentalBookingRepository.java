package com.example.bokningsapp.repository.BookingsRepo;

import com.example.bokningsapp.model.bookings.RentalBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RentalBookingRepository extends JpaRepository <RentalBooking, Integer> {
    RentalBooking findRentalBookingById(int id);

    List <RentalBooking> findAllByRentalId(Long id);
    Boolean existsByRentalIdAndStartDateTimeLessThanEqualAndEndDateTimeGreaterThanEqual(
            Long rentalId, LocalDateTime endDateTime, LocalDateTime startDateTime);

}
