package com.example.bokningsapp.model.bookings;

import com.example.bokningsapp.enums.BookingStatus;
import com.example.bokningsapp.model.Equipment;
import com.example.bokningsapp.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.sql.Time;
import java.util.List;
import java.util.Set;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "equipment_bookings")
public class EquipmentBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookingId;

    @Column
    private String reservationNumber;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "equipment_id", referencedColumnName = "id")
    private Equipment equipment;
    @Column
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate startDate;

    @Column
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate endDate;

    @Column
    @Enumerated(EnumType.STRING)
    private BookingStatus bookingStatus;

    @Column
    @JsonFormat(pattern = "HH:mm")
    private LocalTime pickUp;

    @Column
    @JsonFormat(pattern = "HH:mm")
    private LocalTime dropOff;


    public int getBookingId() {
        return bookingId;
    }

    public String getReservationNumber() {
        return reservationNumber;
    }

    public void setReservationNumber(String reservationNumber) {
        this.reservationNumber = reservationNumber;
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

    @Override
    public String toString() {
        return "EquipmentBooking{" +
                "bookingId=" + bookingId +
                ", reservationNumber='" + reservationNumber + '\'' +
                ", user=" + user +
                ", equipment=" + equipment +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", bookingStatus=" + bookingStatus +
                ", pickUp=" + pickUp +
                ", dropOff=" + dropOff +
                '}';
    }
}
