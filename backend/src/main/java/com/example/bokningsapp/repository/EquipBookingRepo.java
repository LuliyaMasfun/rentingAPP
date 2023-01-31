package com.example.bokningsapp.repository;

import com.example.bokningsapp.enums.BookingStatus;
import com.example.bokningsapp.model.EquipmentBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipBookingRepo extends JpaRepository <EquipmentBooking, Integer>{

    List<EquipmentBooking> findAllByBookingStatus(BookingStatus status);
    List<EquipmentBooking>findAll();
    List<EquipmentBooking> findByEquipmentIdAndBookingStatus(int equipmentId, BookingStatus bookingStatus);

    List<EquipmentBooking> findByUserId(Long id);

  /*  @Query

            ("SELECT b FROM EquipmentBooking b \n" +
                    "JOIN b.equipment e \n" +
                    "WHERE e.id = :equipmentId")
    List<EquipmentBooking> findAllByEquipmentIdAndBookingStatus(@Param("equipmentId") int equipmentId, @Param("bookingStatus") BookingStatus bookingStatus);
*/
  //  List<EquipmentBooking> findAllByUserIdAndEquipmentType(Long userId, EquipmentType equipmentType);

}
