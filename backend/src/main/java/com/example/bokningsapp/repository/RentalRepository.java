package com.example.bokningsapp.repository;

import com.example.bokningsapp.enums.RentalType;
import com.example.bokningsapp.model.Hub;
import com.example.bokningsapp.model.Rental;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RentalRepository  extends JpaRepository<Rental, Long> {

    List<Rental> findRentalByRentalType(RentalType rentalType);
}
