package com.example.bokningsapp.model.bookings;

import com.example.bokningsapp.enums.BookingStatus;
import com.example.bokningsapp.model.Hub;
import com.example.bokningsapp.model.Rental;
import com.example.bokningsapp.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "rental_bookings")
public class RentalBooking {
    @Id
    @GeneratedValue
    int id;

    @Column
    private String bookingNumber;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "rental_id", referencedColumnName = "id")
    private Rental rental;

    @Column
    @JsonFormat(pattern = "yyyy-MM-dd:HH:mm", timezone = "Europe/Stockholm")
    private LocalDateTime startDateTime;

    @Column
    @JsonFormat(pattern = "yyyy-MM-dd:HH:mm", timezone = "Europe/Stockholm")
    private LocalDateTime endDateTime;

    @Column
    private String duration;

    @Column
    @Enumerated(EnumType.STRING)
    private BookingStatus bookingStatus;

    @Column
    @JsonFormat(pattern = "yyyy-MM-dd:HH:mm", timezone = "Europe/Stockholm")
    private LocalDateTime createdOn;

   @Column
   private boolean bookingHandled;

    @Column
    @JsonFormat(pattern = "yyyy-MM-dd:HH:mm", timezone = "Europe/Stockholm")
    @Nullable
    private LocalDateTime updatedOn;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonFormat(pattern = "yyyy-MM-dd:HH:mm", timezone = "Europe/Stockholm")
    @Nullable
    @JoinColumn(name = "updated_by_id", referencedColumnName = "id")
    private User updatedBy;

    public RentalBooking() {
    }

    public RentalBooking(User user, Rental rental, LocalDateTime startDateTime, LocalDateTime endDateTime, String duration, BookingStatus bookingStatus, LocalDateTime createdOn, boolean bookingHandled, LocalDateTime updatedOn, User updatedBy) {
        this.user = user;
        this.rental = rental;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.duration = duration;
        this.bookingStatus = bookingStatus;
        this.createdOn = createdOn;
        this.bookingHandled = bookingHandled;
        this.updatedOn = updatedOn;
        this.updatedBy = updatedBy;
    }

    public int getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Rental getRental() {
        return rental;
    }

    public void setRental(Rental rental) {
        this.rental = rental;
    }

    public LocalDateTime getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(LocalDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public LocalDateTime getEndDateTime() {
        return endDateTime;
    }

    public void setEndDateTime(LocalDateTime endDateTime) {
        this.endDateTime = endDateTime;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public BookingStatus getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(BookingStatus bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public LocalDateTime getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDateTime createdOn) {
        this.createdOn = createdOn;
    }

    public boolean isBookingHandled() {
        return bookingHandled;
    }

    public void setBookingHandled(boolean bookingHandled) {
        this.bookingHandled = bookingHandled;
    }

    public String getBookingNumber() {
        return bookingNumber;
    }

    public void setBookingNumber(String bookingNumber) {
        this.bookingNumber = bookingNumber;
    }

    public LocalDateTime getUpdatedOn() {
        return updatedOn;
    }

    public void setUpdatedOn(LocalDateTime updatedOn) {
        this.updatedOn = updatedOn;
    }

    public User getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(User updatedBy) {
        this.updatedBy = updatedBy;
    }
}
