package com.example.bokningsapp.controller;

import com.example.bokningsapp.enums.EquipmentType;
import com.example.bokningsapp.exception.BookingNotFoundException;
import com.example.bokningsapp.exception.EquipmentNotFoundException;
import com.example.bokningsapp.model.Equipment;
import com.example.bokningsapp.repository.EquipmentRepo;
import com.example.bokningsapp.service.EquipmentService;
import com.example.bokningsapp.service.EquipmentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
public class EquipmentController {

    private final EquipmentRepo equipmentRepo;
    private final EquipmentServiceImpl equipmentServiceImpl;

    @Autowired
    public EquipmentController(EquipmentRepo equipmentRepo, EquipmentServiceImpl equipmentServiceImpl) {
        this.equipmentRepo = equipmentRepo;
        this.equipmentServiceImpl = equipmentServiceImpl;
    }
    @PostMapping(value = "/createEquipment")
    public ResponseEntity<Equipment> createEquipment(@RequestBody Equipment equipment) {

        try{
            if (equipment == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            else{
                equipmentServiceImpl.saveEquipment(equipment);
                return new ResponseEntity<>(equipment,HttpStatus.CREATED);
            }
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }
    @GetMapping(value = "/allEquipment")
    public List<Equipment> getAllEquipment() {
        return equipmentRepo.findAll();
    }

    @DeleteMapping("/equipment/{id}")
    public ResponseEntity<?> deleteEquipment(@PathVariable int id) {
        try {
            equipmentServiceImpl.deleteEquipment(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (EquipmentNotFoundException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/equipmentType/{type}")
    public ResponseEntity<List<Equipment>> findEquipmentByType(@PathVariable EquipmentType type) {
        List<Equipment> equipmentList = equipmentRepo.findByEquipmentType(type);
        if (equipmentList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(equipmentList, HttpStatus.OK);
    }
}

