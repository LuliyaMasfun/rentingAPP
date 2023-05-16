package com.example.bokningsapp.controller.rentals;

import com.example.bokningsapp.model.Hub;
import com.example.bokningsapp.model.bookings.HubBooking;
import com.example.bokningsapp.repository.BookingsRepo.HubBookingRepository;
import com.example.bokningsapp.repository.RentalsRepo.HubRepository;
import com.example.bokningsapp.service.hubService.HubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/hub")
@CrossOrigin(origins = "http://localhost:3000")
public class HubController {

    private HubService hubService;
    private HubRepository hubRepository;
    private HubBookingRepository hubBookingRepository;

    @Autowired
    public HubController(HubService hubService, HubRepository hubRepository, HubBookingRepository hubBookingRepository) {
        this.hubService = hubService;
        this.hubRepository = hubRepository;
        this.hubBookingRepository = hubBookingRepository;
    }

    @PostMapping(value = "/createHub")
    public ResponseEntity<Hub> createHub(@RequestBody Hub hub) {
        Hub newHub = hubService.saveHub(hub);
        return new ResponseEntity<>(newHub, HttpStatus.CREATED);
    }

 /*   @PostMapping(value = "/create-hub/{userId}")
    public ResponseEntity<String>createHub(@PathVariable Long userId, Hub hub){

        return new ResponseEntity<>(hubService.saveHubToUser(userId, hub),HttpStatus.OK);
    }*/


    @GetMapping("/getAllHubs")
    public ResponseEntity<List<Hub>> getAllHubs() {
        List<Hub> hubs = hubRepository.findAll();
        return new ResponseEntity<>(hubs, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteHub/{id}")
    public ResponseEntity<?> deleteHub (@PathVariable Long id){
            hubService.deleteHub(id);
            return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping(value = "/getThisHub/{id}")
    public Optional<Hub> getThisHub(@PathVariable Long id) {
        return hubRepository.findById(id);
    }
    @GetMapping("/hubNames")
    public Map<Long, String> getHubNamesForIds(@RequestParam List<Long> ids) {
        // fetch all hubs with the given IDs
        List<Hub> hubs = hubRepository.findAllById(ids);
        // create a map of IDs to hub names
        Map<Long, String> hubNamesById = new HashMap<>();
        for (Hub hub : hubs) {
            hubNamesById.put(hub.getId(), hub.getHubName());
        }
        return hubNamesById;
    }

    @PutMapping("/editHub/{id}")
    public ResponseEntity<Hub> updateRental(@PathVariable Long id, @RequestBody Hub hub) {
        Hub updatedRental = hubService.updateHub(id, hub);
        return ResponseEntity.ok(updatedRental);
    }
}
