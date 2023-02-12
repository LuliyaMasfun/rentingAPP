package com.example.bokningsapp.security.auth;

import com.example.bokningsapp.model.Equipment;
import com.example.bokningsapp.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test")
public class TestController {
    private final EquipmentRepository equipmentRepository;

    @Autowired
    public TestController(EquipmentRepository equipmentRepository) {
        this.equipmentRepository = equipmentRepository;
    }

    @GetMapping("/all")
        public String allAccess() {
            return "Public Content.";
        }

        @GetMapping("/user")
        @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
        public String userAccess() {
            return "User Content.";
        }


        @GetMapping("/mod")
        @PreAuthorize("hasRole('MODERATOR')")
        public String moderatorAccess() {
            return "Moderator Board.";
        }

        @GetMapping("/admin")
        @PreAuthorize("hasRole('ADMIN')")
        public String adminAccess() {
            return "Admin Board.";
        }
    }

