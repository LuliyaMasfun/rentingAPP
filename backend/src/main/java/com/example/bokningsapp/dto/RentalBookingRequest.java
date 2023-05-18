package com.example.bokningsapp.dto;

import com.example.bokningsapp.model.Hub;
import com.example.bokningsapp.model.Rental;
import com.example.bokningsapp.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class RentalBookingRequest {

    private Long userId;

    private Long rentalId;
    

    @JsonFormat(pattern = "yyyy-MM-dd:HH:mm", timezone = "Europe/Stockholm")
    private LocalDateTime startDateTime;

    @JsonFormat(pattern = "yyyy-MM-dd:HH:mm", timezone = "Europe/Stockholm")
    private LocalDateTime endDateTime;

    public RentalBookingRequest(Long userId, Long rentalId, LocalDateTime startDateTime, LocalDateTime endDateTime) {
        this.userId = userId;
        this.rentalId = rentalId;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getRentalId() {
        return rentalId;
    }

    public void setRentalId(Long rentalId) {
        this.rentalId = rentalId;
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
