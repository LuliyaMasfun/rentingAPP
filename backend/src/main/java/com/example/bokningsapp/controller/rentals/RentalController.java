package com.example.bokningsapp.controller.rentals;

import com.example.bokningsapp.enums.RentalType;
import com.example.bokningsapp.model.Rental;
import com.example.bokningsapp.model.bookings.HubBooking;
import com.example.bokningsapp.model.bookings.RentalBooking;
import com.example.bokningsapp.repository.BookingsRepo.RentalBookingRepository;
import com.example.bokningsapp.repository.RentalsRepo.RentalRepository;
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
    private final RentalBookingRepository rentalBookingRepository;

   @Autowired
    public RentalController(RentalRepository rentalRepository, RentalService rentalService, RentalBookingRepository rentalBookingRepository) {
        this.rentalRepository = rentalRepository;
        this.rentalService = rentalService;
        this.rentalBookingRepository = rentalBookingRepository;
    }

    @PostMapping(value = "/createRental/{id}")
    public ResponseEntity<Rental> createRental(@RequestBody Rental rental, @PathVariable Long id) {
        rental.setEan13(RentalService.generateEAN13());
        rental.setRentalNumber(RentalService.generateRentalNumber());
        Rental newRental = rentalService.saveRental(rental, id);
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
    @GetMapping("/getEquipmentRentals")
    public ResponseEntity<List<Rental>> getRentalsOnRentalTypeEquipment() {
        List<Rental> rentals = rentalRepository.findRentalByRentalType(RentalType.EQUIPMENT);
        return new ResponseEntity<>(rentals, HttpStatus.OK);
    }

    @GetMapping("/getHubRentals")
    public ResponseEntity<List<Rental>> getRentalsOnRentalTypeHub() {
        List<Rental> rentals = rentalRepository.findRentalByRentalType(RentalType.HUB);
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


    @PutMapping("/editThisRental/{id}")
    public ResponseEntity<Rental> updateRental(@PathVariable Long id, @RequestBody Rental rental) {
        Rental updatedRental = rentalService.updateRental(id, rental);
        return ResponseEntity.ok(updatedRental);
    }

    @GetMapping("/rentalNames")
    public Map<Long, String> getHubNamesForIds(@RequestParam List<Long> ids) {
        // fetch all hubs with the given IDs
        List<Rental> rentals = rentalRepository.findAllById(ids);
        // create a map of IDs to hub names
        Map<Long, String> rentalNamesById = new HashMap<>();
        for (Rental rental : rentals) {
            rentalNamesById.put(rental.getId(), rental.getName());
        }
        return rentalNamesById;
    }
    @GetMapping(value = "/getRentalTypes")
    public ResponseEntity<RentalType[]> getRentalTypes() {
        RentalType[] rentalTypes = RentalType.values();
        return ResponseEntity.ok(rentalTypes);
    }

    @GetMapping("/bookingsInfo")
    public Map<Integer, Map<String, String>> getBookingInfoForRental(@RequestParam Long id) {

        List<RentalBooking> bookings = rentalBookingRepository.findAllByRentalId(id);

        Map<Integer, Map<String, String>> bookingInfoById = new HashMap<>();

        for (RentalBooking booking : bookings) {
            Map<String, String> hubMap = new HashMap<>();
            hubMap.put("bookingNumber", booking.getBookingNumber());
            hubMap.put("bookingStatus", booking.getBookingStatus().toString());
            hubMap.put("startDate", booking.getStartDateTime().toString());
            hubMap.put("endDate", booking.getEndDateTime().toString());
            hubMap.put("createdOn", booking.getCreatedOn().toString());
            hubMap.put("userFirstName", booking.getUser().getFirstName());
            hubMap.put("userLastName", booking.getUser().getLastName());
            bookingInfoById.put(booking.getId(), hubMap);
        }
        return bookingInfoById;
    }

}
