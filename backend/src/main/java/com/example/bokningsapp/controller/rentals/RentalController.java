package com.example.bokningsapp.controller.rentals;

import com.example.bokningsapp.enums.RentalType;
import com.example.bokningsapp.model.Hub;
import com.example.bokningsapp.model.Rental;
import com.example.bokningsapp.repository.RentalRepository;
import com.example.bokningsapp.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/rental")
@CrossOrigin(origins = "http://localhost:3000")
public class RentalController {

    private final RentalRepository rentalRepository;
    private final RentalService rentalService;

   @Autowired
    public RentalController(RentalRepository rentalRepository, RentalService rentalService) {
        this.rentalRepository = rentalRepository;
        this.rentalService = rentalService;
    }

    @PostMapping(value = "/createRental")
    public ResponseEntity<Rental> createRental(@RequestBody Rental rental) {
        Rental newRental = rentalService.saveRental(rental);
        return new ResponseEntity<>(newRental, HttpStatus.CREATED);
    }

    @GetMapping("/getAllRentals")
    public ResponseEntity<List<Rental>> getAllRentals() {
        List<Rental> rentals = rentalRepository.findAll();
        return new ResponseEntity<>(rentals, HttpStatus.OK);
    }

    @GetMapping("/getRentalsOnRentalType/{rentalType}")
    public ResponseEntity<List<Rental>> getRentalsOnRentalType(@PathVariable RentalType rentalType) {
        List<Rental> rentals = rentalRepository.findRentalByRentalType(rentalType);
        return new ResponseEntity<>(rentals, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteRental/{id}")
    public ResponseEntity<?> deleteRental (@PathVariable Long id){
        rentalService.deleteRental(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/getThisRental/{id}")
    public Optional<Rental> getThisRental(@PathVariable Long id) {
        return rentalRepository.findById(id);
    }

    @GetMapping("/rentalNames")
    public Map<Long, String> getRentalNamesForIds(@RequestParam List<Long> ids) {
        // fetch all hubs with the given IDs
        List<Rental> rentals = rentalRepository.findAllById(ids);
        // create a map of IDs to hub names
        Map<Long, String> rentalNamesById = new HashMap<>();
        for (Rental rental : rentals) {
            rentalNamesById.put(rental.getId(), rental.getName());
        }
        return rentalNamesById;
    }
}
