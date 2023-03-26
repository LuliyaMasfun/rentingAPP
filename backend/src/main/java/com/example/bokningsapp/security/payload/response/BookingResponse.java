package com.example.bokningsapp.security.payload.response;

import com.example.bokningsapp.enums.BookingStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse {

    @GeneratedValue(strategy = GenerationType.AUTO)
    private String reservationNumber;
    private BookingStatus bookingStatus;
    private LocalTime pickUp;
    private LocalTime dropOff;


    public String getReservationNumber() {
        return reservationNumber;
    }

    public void setReservationNumber(String reservationNumber) {
        this.reservationNumber = reservationNumber;
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
}
