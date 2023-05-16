package com.example.bokningsapp.repository.BookingsRepo;

import com.example.bokningsapp.model.bookings.EquipmentBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipBookingRepository extends JpaRepository <EquipmentBooking, Long>{
    @Query("SELECT b FROM EquipmentBooking b WHERE b.equipment.id = :equipmentId")
    List<EquipmentBooking> findByEquipmentId(@Param("equipmentId") int equipmentId);




}
