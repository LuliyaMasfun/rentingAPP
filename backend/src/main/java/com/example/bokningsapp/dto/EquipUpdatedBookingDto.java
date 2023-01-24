package com.example.bokningsapp.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.jetbrains.annotations.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public class EquipUpdatedBookingDto {

    @NotNull
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate startDate;

    @NotNull
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate endDate;

    @NotNull
    @JsonFormat(pattern = "HH:mm")
    private LocalTime pickUp;

    @NotNull
    @JsonFormat(pattern = "HH:mm")
    private LocalTime dropOff;

    public EquipUpdatedBookingDto() {
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

    @Override
    public String toString() {
        return "UpdatedEquipmentBookingDto{" +
                "startDate=" + startDate +
                ", endDate=" + endDate +
                '}';
    }
}
