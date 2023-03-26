package com.example.bokningsapp.dto;

import com.example.bokningsapp.model.Hub;
import com.example.bokningsapp.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.time.LocalTime;

public class HubBookingRequest {

    private User user;

    private Hub hub;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate startDate;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate endDate;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime pickUp;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime dropOff;


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Hub getHub() {
        return hub;
    }

    public void setHub(Hub hub) {
        this.hub = hub;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public LocalTime getPickUp() {
        return pickUp;
    }

    public void setPickUp(LocalTime pickUp) {
        this.pickUp = pickUp;
    }

    public LocalTime getDropOff() {
        return dropOff;
    }

    public void setDropOff(LocalTime dropOff) {
        this.dropOff = dropOff;
    }
}