package com.example.bokningsapp.service;


import com.example.bokningsapp.dto.UpdatedEquipBookingDto;
import com.example.bokningsapp.enums.BookingStatus;
import com.example.bokningsapp.enums.EquipmentStatus;
import com.example.bokningsapp.exception.*;
import com.example.bokningsapp.model.Equipment;
import com.example.bokningsapp.model.EquipmentBooking;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.repository.EquipBookingRepo;
import com.example.bokningsapp.repository.EquipmentRepo;
import com.example.bokningsapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDate;
import java.util.List;


@Service
public class EquipBookingServiceImpl implements EquipBookingService {

  private final EquipBookingRepo equipBookingRepo;
  private final EquipmentRepo equipmentRepo;
  private final UserRepository userRepository;

  @Autowired
    public EquipBookingServiceImpl(EquipBookingRepo equipBookingRepo, EquipmentRepo equipmentRepo, UserRepository userRepository) {
        this.equipBookingRepo = equipBookingRepo;
        this.equipmentRepo = equipmentRepo;
        this.userRepository = userRepository;
    }

    @Override
    public EquipmentBooking save(EquipmentBooking equipmentBooking) {
        return equipBookingRepo.save(equipmentBooking);
    }

    @Override
    public List<EquipmentBooking> findAllByStatus(BookingStatus status){
        return equipBookingRepo.findAllByBookingStatus(status);
    }

    @Override
    public List<EquipmentBooking> findAll() {
        return equipBookingRepo.findAll();
    }

    @Override
    public EquipmentBooking updateBooking(int bookingId, UpdatedEquipBookingDto updatedEquipmentBookingDto, User user) {
        //check if the booking exists
        EquipmentBooking equipmentBooking = equipBookingRepo.findById(bookingId)
                .orElseThrow(() -> new BookingNotFoundException("Booking not found"));
        //check if the booking belongs to the user
        if (!equipmentBooking.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedUserException("You are not authorized to update this booking");
        }
        //check if the equipment is available for the new dates
        List<Equipment> equipmentList = equipmentBooking.getEquipment();
        for (Equipment equipment : equipmentList) {
            Equipment foundEquipment = equipmentRepo.findById(equipment.getId())
                    .orElseThrow(() -> new EquipmentNotFoundException("Equipment not found"));

                if (isOverlapping(updatedEquipmentBookingDto.getStartDate(), updatedEquipmentBookingDto.getEndDate(), equipment.getId())) {
                    throw new IllegalArgumentException("Equipment is not available for booking");
                }
                throw new EquipmentNotAvailableException("The equipment is not available for the new dates");
            }
        //update the booking
        equipmentBooking.setStartDate(updatedEquipmentBookingDto.getStartDate());
        equipmentBooking.setEndDate(updatedEquipmentBookingDto.getEndDate());
        equipmentBooking.setPickUp(updatedEquipmentBookingDto.getPickUp());
        equipmentBooking.setDropOff(updatedEquipmentBookingDto.getDropOff());

        EquipmentBooking updatedBooking = equipBookingRepo.save(equipmentBooking);
        //update the equipment status
        for (Equipment equipment : equipmentList) {
            equipment.setEquipmentStatus(EquipmentStatus.UNAVAILABLE);
            equipmentRepo.save(equipment);
        }
        return updatedBooking;
    }

    @Override
    @Transactional
    public EquipmentBooking createBooking(EquipmentBooking equipmentBooking) {
        User user = userRepository.findById(equipmentBooking.getUser().getId())
                .orElseThrow(() -> new UserNotFoundException("User not found with id " + equipmentBooking.getUser().getId()));

        List<Equipment> equipmentList = equipmentBooking.getEquipment();
        for (Equipment equipment : equipmentList) {
            Equipment foundEquipment = equipmentRepo.findById(equipment.getId())
                    .orElseThrow(() -> new EquipmentNotFoundException("Equipment not found with id " + equipmentRepo.findById(equipment.getId())));
        if (equipment.getEquipmentStatus() != EquipmentStatus.AVAILABLE) {
            throw new EquipmentNotAvailableException("Equipment is not available for booking");
        }
        }
        LocalDate startDate = equipmentBooking.getStartDate();
        LocalDate endDate =  equipmentBooking.getEndDate();
        Duration duration = Duration.between(startDate,endDate);
        long days = duration.toDays();
        if (days > 2) {
            throw new IllegalArgumentException("Booking can't be more than 2 days");
        }
        for (Equipment equipment : equipmentList) {
            if (isOverlapping(startDate, endDate, equipment.getId())) {
                throw new IllegalArgumentException("Invalid choice of Date");
            }
        }
        equipmentBooking.setUser(equipmentBooking.getUser());
        equipmentBooking.setEquipment(equipmentBooking.getEquipment());
        equipmentBooking.setStartDate(equipmentBooking.getStartDate());
        equipmentBooking.setEndDate(equipmentBooking.getEndDate());

        equipBookingRepo.save(equipmentBooking);
        for (Equipment equipment : equipmentList) {
            equipment.setEquipmentStatus(EquipmentStatus.UNAVAILABLE);
            equipmentRepo.save(equipment);
        }
        return equipmentBooking;
    }

    private boolean isOverlapping(LocalDate startDate, LocalDate endDate, int equipmentId) {
        Equipment equipment = equipmentRepo.findById(equipmentId)
                .orElseThrow(() -> new EquipmentNotFoundException("Equipment not found"));

        List<EquipmentBooking> equipmentBookings = equipBookingRepo.findByEquipmentIdAndBookingStatus(equipmentId, BookingStatus.APPROVED);
        for (EquipmentBooking equipmentBooking : equipmentBookings) {
            if (startDate.isBefore(equipmentBooking.getEndDate()) && endDate.isAfter(equipmentBooking.getStartDate())) {
                return false;
            }
        }
        return true;   }

    @Override
    public List<EquipmentBooking> findAllBookings() {
        return equipBookingRepo.findAll();
    }


    @Override
    public void deleteBooking(int id){
        equipBookingRepo.deleteById(id);
    }

}
