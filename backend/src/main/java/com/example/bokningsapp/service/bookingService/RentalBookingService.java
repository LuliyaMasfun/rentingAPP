package com.example.bokningsapp.service.bookingService;

import com.example.bokningsapp.dto.HubBookingRequest;
import com.example.bokningsapp.dto.RentalBookingRequest;
import com.example.bokningsapp.enums.BookingStatus;
import com.example.bokningsapp.enums.ERole;
import com.example.bokningsapp.enums.RentalStatus;
import com.example.bokningsapp.model.Hub;
import com.example.bokningsapp.model.Rental;
import com.example.bokningsapp.model.Role;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.model.bookings.HubBooking;
import com.example.bokningsapp.model.bookings.RentalBooking;
import com.example.bokningsapp.repository.BookingsRepo.RentalBookingRepository;
import com.example.bokningsapp.repository.RentalsRepo.RentalRepository;
import com.example.bokningsapp.repository.UsersRepo.RoleRepository;
import com.example.bokningsapp.repository.UsersRepo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class RentalBookingService {
    private final UserRepository userRepository;
    private final RentalBookingRepository rentalBookingRepository;
    private final RentalRepository rentalRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public RentalBookingService(UserRepository userRepository, RentalBookingRepository rentalBookingRepository, RentalRepository rentalRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.rentalBookingRepository = rentalBookingRepository;
        this.rentalRepository = rentalRepository;
        this.roleRepository = roleRepository;
    }

    public void placeBooking (RentalBookingRequest bookingRequest) {

        User user = userRepository.findById(bookingRequest.getUser().getId()).orElseThrow(() -> new RuntimeException("User not found"));
        Rental rental = rentalRepository.findById(bookingRequest.getRental().getId()).orElseThrow(() -> new RuntimeException("Rental not found"));

        if (rental.getRentalStatus() != RentalStatus.AVAILABLE) {
            throw new RuntimeException("Rental is not available for booking");
        }
        if(!rental.isAvailableToRent()) {
            throw new RuntimeException("Rental is not available for booking");
        }
        // Validate booking dates
        LocalDateTime startDateTime = bookingRequest.getStartDateTime();
        LocalDateTime endDateTime = bookingRequest.getEndDateTime();
        LocalDateTime now = LocalDateTime.now();
        if (startDateTime.isBefore(now) || endDateTime.isBefore(now)) {
            throw new RuntimeException("Booking dates cannot be in the past");
        }
        if (endDateTime.isBefore(startDateTime)) {
            throw new RuntimeException("End date must be after start date");
        }

        //Set attributes for booking
        RentalBooking newBooking = new RentalBooking();
        newBooking.setUser(user);
        newBooking.setRental(rental);
        newBooking.setStartDateTime(bookingRequest.getStartDateTime());
        newBooking.setEndDateTime(bookingRequest.getEndDateTime());
        String bookingNumber = UUID.randomUUID().toString().substring(0, 8);
        newBooking.setBookingNumber(bookingNumber);
        newBooking.setBookingStatus(BookingStatus.PENDING);
        newBooking.setCreatedOn(LocalDateTime.now());
        if (user.getRoles().stream().anyMatch(role -> role.getName() == ERole.ROLE_USER)) {
            newBooking.setBookingHandled(false);
        } else {
            newBooking.setBookingHandled(true);
        }

        // Calculate duration
        Duration duration = Duration.between(newBooking.getStartDateTime(), newBooking.getEndDateTime());
        long days = duration.toDaysPart();
        long hours = duration.toHoursPart();
        String formattedDuration = String.format("%d days, %d hours", days, hours);
        newBooking.setDuration(formattedDuration);

        //Validate the max duration
        Long maxTimeToRent = newBooking.getRental().getMaxTimeToRent();
        if (duration.toHours() > maxTimeToRent) {
            System.out.println(duration.toHours());
            throw new RuntimeException("Booking duration exceeds maximum time to rent for this rental.");
        }
        // Set RentalStatus to UNAVAILABLE during the duration of the booking

        Rental bookedRental = newBooking.getRental();
        LocalDateTime startDateTimeUnavailable = newBooking.getStartDateTime();
        Duration delay = Duration.between(LocalDateTime.now(), startDateTimeUnavailable);

        ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);
        executorService.schedule(() -> {
            bookedRental.setRentalStatus(RentalStatus.UNAVAILABLE);
            rentalRepository.save(bookedRental);
            }, delay.toMillis(), TimeUnit.MILLISECONDS);

        executorService.schedule(() -> {
            Rental rentalAvailable = rentalRepository.findById(bookedRental.getId()).orElseThrow(() -> new RuntimeException("Rental not found"));
            rentalAvailable.setRentalStatus(RentalStatus.AVAILABLE);
            rentalRepository.save(rentalAvailable);
        }, duration.getSeconds(), TimeUnit.SECONDS);

        rentalBookingRepository.save(newBooking);

    }
}
