package com.example.bokningsapp.service;

import com.example.bokningsapp.enums.RentalType;
import com.example.bokningsapp.model.Rental;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.repository.RentalsRepo.RentalRepository;
import com.example.bokningsapp.repository.UsersRepo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@Service
public class RentalService {

    private final RentalRepository rentalRepository;
    private final UserRepository userRepository;

    @Autowired
    public RentalService(RentalRepository rentalRepository,
                         UserRepository userRepository) {
        this.rentalRepository = rentalRepository;
        this.userRepository = userRepository;
    }

    //SAVE RENTAL
    public Rental saveRental(Rental rental,long id) {
        User user = userRepository.findById(id).orElseThrow(()-> new RuntimeException("User not found"));
        System.out.println(user.getFirstName());
        rental.setCreatedBy(user);
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
        Rental existingRental = rentalRepository.findRentalById(rentalId);
            if (rental.getName() != null) {
                existingRental.setName(rental.getName());
            }
            if (rental.getLocation() != null) {
                existingRental.setLocation(rental.getLocation());
            }
            if (rental.getImage() != null) {
                existingRental.setImage(rental.getImage());
            }
            if (rental.getMaxTimeToRent() != null) {
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
            existingRental.setUpdatedBy(rental.getUpdatedBy());
            existingRental.setUpdatedOn(LocalDate.now());

            return rentalRepository.save(existingRental);

        }

    public static String generateEAN13() {
        Random random = new Random();
        int[] digits = new int[12];
        for (int i = 0; i < 12; i++) {
            digits[i] = random.nextInt(10);
        }
        int sum = 0;
        for (int i = 0; i < 12; i++) {
            if (i % 2 == 0) {
                sum += digits[i] * 1;
            } else {
                sum += digits[i] * 3;
            }
        }
        int checksum = (10 - (sum % 10)) % 10;
        return Arrays.toString(digits).replaceAll("[^\\d]", "") + checksum;
    }

    public static String generateRentalNumber() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString().substring(0, 8);
    }

}
