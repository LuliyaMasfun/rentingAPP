package com.example.bokningsapp.controller;


import com.example.bokningsapp.model.Role;
import com.example.bokningsapp.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/role")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class RoleController {


    private final RoleRepository roleRepository;

    @Autowired
    public RoleController(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @PostMapping("/create-role")
    public ResponseEntity<Role> createRole(@RequestBody Role role){

        Role _role = new Role(role.getName());

        roleRepository.save(_role);

        return new ResponseEntity<>(_role, HttpStatus.OK);

    }

}
