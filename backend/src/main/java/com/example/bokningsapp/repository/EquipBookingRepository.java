package com.example.bokningsapp.repository;

import com.example.bokningsapp.model.Equipment;
import com.example.bokningsapp.model.EquipmentBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipBookingRepository extends JpaRepository <EquipmentBooking, Integer>{
    @Query("SELECT b FROM EquipmentBooking b WHERE b.equipment.id = :equipmentId")
    List<EquipmentBooking> findByEquipmentId(@Param("equipmentId") int equipmentId);




}
