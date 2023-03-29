package com.example.bokningsapp.controller.rentals;

import com.example.bokningsapp.enums.EquipmentStatus;
import com.example.bokningsapp.enums.EquipmentType;
import com.example.bokningsapp.exception.EquipmentNotFoundException;
import com.example.bokningsapp.model.Equipment;
import com.example.bokningsapp.repository.EquipmentRepository;
import com.example.bokningsapp.repository.UserRepository;
import com.example.bokningsapp.security.jwt.JwtService;
import com.example.bokningsapp.service.equipmentService.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/equipment")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class EquipmentController {

    private final EquipmentRepository equipmentRepo;
    private final EquipmentService equipmentService;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private static final String SECRET_KEY="2A46294A404E635266556A586E3272357538782F413F4428472B4B6150645367";

    @Autowired
    public EquipmentController(EquipmentRepository equipmentRepo, EquipmentService equipmentService, JwtService jwtService, UserRepository userRepository) {
        this.equipmentRepo = equipmentRepo;
        this.equipmentService = equipmentService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }
    @PostMapping(value = "/createEquipment")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Equipment> createEquipment(@RequestBody Equipment equipment) {

        Equipment newEquipment = equipmentService.saveEquipment(equipment);
        return new ResponseEntity<>(newEquipment, HttpStatus.CREATED);
    }
    @GetMapping("/allEquipment")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Equipment>> getAllEquipments() {
        List<Equipment> equipments = equipmentRepo.findAll();
        return new ResponseEntity<>(equipments, HttpStatus.OK);
    }



    @DeleteMapping("/equipment/{id}")
  //  @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteEquipment(@PathVariable Long id) {
        try {
            equipmentService.deleteEquipment(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (EquipmentNotFoundException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/equipmentType/{type}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<List<Equipment>> findEquipmentByType(@PathVariable EquipmentType type) {
        List<Equipment> equipmentList = equipmentRepo.findByEquipmentType(type);
        if (equipmentList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(equipmentList, HttpStatus.OK);
    }

    @GetMapping("/equipmentStatus/{status}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<List<Equipment>> findAllByEquipmentStatus(@PathVariable EquipmentStatus status){
        List<Equipment> equipmentList = equipmentRepo.findAllByEquipmentStatus(status);
        if (equipmentList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(equipmentList, HttpStatus.OK);
    }
    @GetMapping(value = "/getEquipment/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public Optional<Equipment> getEquipment(@PathVariable Long id) {

        return equipmentRepo.findById(id);
    }


    }




