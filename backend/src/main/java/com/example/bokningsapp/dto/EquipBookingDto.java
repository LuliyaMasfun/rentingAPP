package com.example.bokningsapp.dto;

import com.example.bokningsapp.enums.BookingStatus;
import com.example.bokningsapp.model.Equipment;
import com.example.bokningsapp.model.EquipmentBooking;
import com.example.bokningsapp.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

public class EquipBookingDto {


    private User user;
    private Equipment equipment;
    private LocalDate startDate;
    private LocalDate endDate;
    private BookingStatus bookingStatus;
    private LocalTime pickUp;
    private LocalTime dropOff;
    private String equipBookedImg;

    public EquipBookingDto(EquipmentBooking equipmentBooking) {
        this.user = equipmentBooking.getUser();
        this.equipment = equipmentBooking.getEquipment();
        this.startDate = equipmentBooking.getStartDate();
        this.endDate = equipmentBooking.getEndDate();
        this.bookingStatus = equipmentBooking.getBookingStatus();
        this.pickUp = equipmentBooking.getPickUp();
        this.dropOff = equipmentBooking.getDropOff();
        this.equipBookedImg = equipmentBooking.getEquipBookedImg();
    }

    public EquipBookingDto() {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Equipment getEquipment() {
        return equipment;
    }

    public void setEquipment(Equipment equipment) {
        this.equipment = equipment;
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

    public BookingStatus getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(BookingStatus bookingStatus) {
        this.bookingStatus = bookingStatus;
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

    public String getEquipBookedImg() {
        return equipBookedImg;
    }

    public void setEquipBookedImg(String equipBookedImg) {
        this.equipBookedImg = equipBookedImg;
    }
}



