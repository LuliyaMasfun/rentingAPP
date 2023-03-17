package com.example.bokningsapp.controller.rentals;

import com.example.bokningsapp.dto.createHubDto;
import com.example.bokningsapp.exception.EquipmentNotFoundException;
import com.example.bokningsapp.model.Equipment;
import com.example.bokningsapp.model.Hub;
import com.example.bokningsapp.repository.HubRepository;
import com.example.bokningsapp.service.hubService.HubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/hub")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class HubController {

    private HubService hubService;
    private HubRepository hubRepository;

    @Autowired
    public HubController(HubService hubService, HubRepository hubRepository) {
        this.hubService = hubService;
        this.hubRepository = hubRepository;
    }

    @PostMapping(value = "/createHub")
    public ResponseEntity<Hub> createHub(@RequestBody Hub hub) {
        Hub newHub = hubService.saveHub(hub);
        return new ResponseEntity<>(hub, HttpStatus.CREATED);
    }

    @GetMapping("/getAllHubs")
    public ResponseEntity<List<Hub>> getAllHubs() {
        List<Hub> hubs = hubRepository.findAll();
        return new ResponseEntity<>(hubs, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteHub/{id}")
    public ResponseEntity<?> deleteHub (@PathVariable int id){
            hubService.deleteHub(id);
            return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping(value = "/getThisHub/{id}")
    public Optional<Hub> getThisHub(@PathVariable int id) {
        return hubRepository.findById(id);
    }
}
