package com.example.bokningsapp.service;

import com.example.bokningsapp.enums.EquipmentStatus;
import com.example.bokningsapp.enums.EquipmentType;
import com.example.bokningsapp.model.Equipment;
import com.example.bokningsapp.model.EquipmentBooking;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EquipmentService {
    public Equipment saveEquipment(Equipment equipment);
    public void updateEquipmentStatus(int equipmentId, boolean isBooked);
    public List<Equipment> findEquipmentByType(EquipmentType equipmentType);
    public void deleteEquipment(int id);
}
