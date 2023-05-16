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
import com.example.bokningsapp.security.jwt.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
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

    public RentalBooking placeBooking(RentalBookingRequest bookingRequest) {

        User user = userRepository.findById(bookingRequest.getUser().getId()).orElseThrow(() -> new RuntimeException("User not found"));
        Rental rental = rentalRepository.findById(bookingRequest.getRental().getId()).orElseThrow(() -> new RuntimeException("Rental not found"));

        //Validate Rental Availability
        if (!rental.isAvailableToRent()) {
            throw new RuntimeException("Rental is not available for booking");
        }
        Boolean isRentalBusy = rentalBookingRepository.existsByRentalIdAndStartDateTimeLessThanEqualAndEndDateTimeGreaterThanEqual(rental.getId(), bookingRequest.getEndDateTime(), bookingRequest.getStartDateTime());
        if (isRentalBusy) {
            throw new RuntimeException("Booking conflict exists for rental " + rental.getId() + " on requested date and time");
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
        if (user.getRole().getName() == ERole.ROLE_USER) {
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
        rentalBookingRepository.save(newBooking);
        return newBooking;
    }


    //UPDATE BOOKING STATUS, ADMIN!
    public RentalBooking updateBookingStatus(int bookingId, RentalBooking rentalBooking) {
        RentalBooking booking = rentalBookingRepository.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));

       /* ERole userRole = JwtService.getUserRoleFromToken(token);

        if (userRole != ERole.ROLE_ADMIN) {
            throw new RuntimeException("User is not authorized to update the booking status");
        }
*/
        // Change and save BOOKING STATUS
        BookingStatus newBookingStatus = rentalBooking.getBookingStatus();
        if (newBookingStatus != null) {
            booking.setBookingStatus(newBookingStatus);
            booking.setUpdatedOn(LocalDateTime.now());
        }
        Rental bookedRental = booking.getRental();
        // UPDATE BOOKING STATUS AND RENTAL STATUS
        switch (newBookingStatus) {
            case PENDING:
                // Do nothing with RentalStatus, as it should remain AVAILABLE until BookingStatus changes.
                break;
            case APPROVED:
                booking.setUpdatedOn(LocalDateTime.now());

                // Set BookingStatus to ACTIVE and schedule a task to update the BookingStatus and RentalStatus when the booking starts.
                LocalDateTime startDateTime = booking.getStartDateTime();
                LocalDateTime now = LocalDateTime.now();
                if (now.isAfter(startDateTime)) {
                    booking.setBookingStatus(BookingStatus.ACTIVE);
                    bookedRental.setRentalStatus(RentalStatus.UNAVAILABLE);
                    rentalRepository.save(bookedRental);
                    rentalBookingRepository.save(booking);
                } else {
                    // Schedule task to update booking status to ACTIVE at booking start time
                    Duration duration = Duration.between(now, startDateTime);
                    ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);
                    executorService.schedule(() -> {
                        booking.setBookingStatus(BookingStatus.ACTIVE);
                        bookedRental.setRentalStatus(RentalStatus.UNAVAILABLE);
                        booking.setUpdatedOn(LocalDateTime.now());
                        rentalRepository.save(bookedRental);
                        rentalBookingRepository.save(booking);
                    }, duration.getSeconds(), TimeUnit.SECONDS);
                }

                LocalDateTime endDateTime = booking.getEndDateTime();
                Duration duration = Duration.between(now, endDateTime);
                if (booking.getBookingStatus() != BookingStatus.ACTIVE && now.isBefore(endDateTime)) {
                    ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);
                    executorService.schedule(() -> {
                        // Change booking and rental status to COMPLETED WHEN booking duration is over.
                       // bookedRental.setRentalStatus(RentalStatus.AVAILABLE);
                        booking.setBookingStatus(BookingStatus.COMPLETED);
                        booking.setUpdatedOn(LocalDateTime.now());
                        rentalRepository.save(bookedRental);
                        rentalBookingRepository.save(booking);
                    }, duration.toMillis(), TimeUnit.MILLISECONDS);
                }
                break;
            case ACTIVE:
                  /*  LocalDateTime now2 = LocalDateTime.now();
                    LocalDateTime endDateTime = booking.getEndDateTime();
                    Duration duration = Duration.between(now2, endDateTime);
                if (booking.getBookingStatus() != BookingStatus.ACTIVE && now2.isBefore(endDateTime)) {
                    ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);
                    executorService.schedule(() -> {
                        // Change booking and rental status to COMPLETED WHEN booking duration is over.
                        bookedRental.setRentalStatus(RentalStatus.AVAILABLE);
                        booking.setBookingStatus(BookingStatus.COMPLETED);
                        booking.setUpdatedOn(LocalDateTime.now());
                        rentalRepository.save(bookedRental);
                        rentalBookingRepository.save(booking);
                    }, duration.toMillis(), TimeUnit.MILLISECONDS);
                }

                   */
                break;
            case COMPLETED:
            case REJECTED:
                // Set RentalStatus to AVAILABLE when BookingStatus is changed to REJECTED.
                // Set RentalStatus to AVAILABLE when BookingStatus is changed to COMPLETE.
               // bookedRental.setRentalStatus(RentalStatus.AVAILABLE);
                rentalRepository.save(bookedRental);
                break;
        }
        rentalBookingRepository.save(booking);
        return booking;

    }


    public List<RentalBooking> getAllBookingsOnThisRental (Long rentalId) {
        return rentalBookingRepository.findAllByRentalId(rentalId);
    }


}
