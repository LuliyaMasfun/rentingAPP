package com.example.bokningsapp.service;

import com.example.bokningsapp.enums.EquipmentType;
import com.example.bokningsapp.enums.RentalType;
import com.example.bokningsapp.exception.RentalNotFoundException;
import com.example.bokningsapp.model.Rental;
import com.example.bokningsapp.repository.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class RentalService {

    private final RentalRepository rentalRepository;

    @Autowired
    public RentalService(RentalRepository rentalRepository) {
        this.rentalRepository = rentalRepository;
    }

    //SAVE RENTAL
    public Rental saveRental(Rental rental) {
        return rentalRepository.save(rental);
    }

    //DELETE RENTAL
    @Transactional
    public void deleteRental(Long id) {
        Rental deletedRental = rentalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hub not found with id " + id));
        rentalRepository.delete(deletedRental);
    }

    // FIND BY RENTAL TYPE
    public List<Rental> findRentalByRentalType(RentalType rentalType) {
        return rentalRepository.findRentalByRentalType(rentalType);
    }

    // UPDATE RENTAL
    public Rental updateRental(Long rentalId, Rental rental) {
        Optional<Rental> optionalRental = rentalRepository.findById(rentalId);
        if (optionalRental.isPresent()) {
            Rental existingRental = optionalRental.get();
            if (rental.getName() != null) {
                existingRental.setName(rental.getName());
            }
            if (rental.getLocation() != null) {
                existingRental.setLocation(rental.getLocation());
            }
            if (rental.getImage() != null) {
                existingRental.setImage(rental.getImage());
            }
            if (rental.getMaxTimeToRent() != 0) {
                existingRental.setMaxTimeToRent(rental.getMaxTimeToRent());
            }
            if (rental.getDescription() != null) {
                existingRental.setDescription(rental.getDescription());
            }
            if (rental.getRentalType() != null) {
                existingRental.setRentalType(rental.getRentalType());
            }
            if (rental.getRentalStatus() != null) {
                existingRental.setRentalStatus(rental.getRentalStatus());
            }
            if (rental.isAvailableToRent() != existingRental.isAvailableToRent()) {
                existingRental.setAvailableToRent(rental.isAvailableToRent());
            }
            if (rental.getMaxAmountOfPeople() != 0) {
                existingRental.setMaxAmountOfPeople(rental.getMaxAmountOfPeople());
            }
            if (rental.getBrand() != null) {
                existingRental.setBrand(rental.getBrand());
            }
            if (rental.getEquipmentType() != null) {
                existingRental.setEquipmentType(rental.getEquipmentType());
            }
            if (rental.getHubType() != null) {
                existingRental.setHubType(rental.getHubType());
            }
            if (rental.getEventType() != null) {
                existingRental.setEventType(rental.getEventType());
            }
            if (rental.getCreatedBy() != null) {
                existingRental.setCreatedBy(rental.getCreatedBy());
            }
            if (rental.getCreatedOn() != null) {
                existingRental.setCreatedOn(rental.getCreatedOn());
            }
            existingRental.setUpdatedBy(rental.getUpdatedBy());
            existingRental.setUpdatedOn(LocalDate.now());

            return rentalRepository.save(existingRental);
        } else {
            throw new RentalNotFoundException("Rental not found with id: " + rentalId);
        }
    }

}
