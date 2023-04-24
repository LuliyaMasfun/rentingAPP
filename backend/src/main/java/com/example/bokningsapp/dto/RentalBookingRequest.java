package com.example.bokningsapp.dto;

import com.example.bokningsapp.model.Hub;
import com.example.bokningsapp.model.Rental;
import com.example.bokningsapp.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class RentalBookingRequest {

    private User user;

    private Rental rental;

    @JsonFormat(pattern = "yyyy-MM-dd:HH:mm", timezone = "Europe/Stockholm")
    private LocalDateTime startDateTime;

    @JsonFormat(pattern = "yyyy-MM-dd:HH:mm", timezone = "Europe/Stockholm")
    private LocalDateTime endDateTime;

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
}
