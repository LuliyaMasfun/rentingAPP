package com.example.bokningsapp.service.hubService;


import com.example.bokningsapp.exception.ResourceNotFoundException;
import com.example.bokningsapp.model.Hub;
import com.example.bokningsapp.repository.RentalsRepo.HubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class HubService {

    private HubRepository hubRepository;

    @Autowired
    public HubService(HubRepository hubRepository) {
        this.hubRepository = hubRepository;
    }

    public Hub saveHub(Hub hub) {
        return hubRepository.save(hub);
    }

    @Transactional
    public void deleteHub(Long id) {
        Hub deletedHub = hubRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hub not found with id " + id));
        hubRepository.delete(deletedHub);
    }

    public Hub updateHub(Long rentalId, Hub rental) {
        Hub existingRental = hubRepository.findById(rentalId)
                .orElseThrow(() -> new ResourceNotFoundException("Rental not found with id: ", rentalId));

        existingRental.setHubName(rental.getHubName());
        existingRental.setHubLocation(rental.getHubLocation());
        existingRental.setHubImg(rental.getHubImg());
        existingRental.setMaxTimeToRent(rental.getMaxTimeToRent());
        existingRental.setHubDescription(rental.getHubDescription());
        existingRental.setRentalType(rental.getRentalType());
        existingRental.setRentalStatus(rental.getRentalStatus());

        return hubRepository.save(existingRental);
    }


}
