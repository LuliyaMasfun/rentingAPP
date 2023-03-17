package com.example.bokningsapp.dto;

import com.example.bokningsapp.enums.RentalStatus;
import com.example.bokningsapp.enums.RentalType;
import jakarta.persistence.*;

public class createHubDto {

    private String hubName;
    private String hubLocation;
    private String hubImg;
    private int maxTimeToRent;
    private String hubDescription;
    private RentalType rentalType;
    private RentalStatus rentalStatus;

    public String getHubName() {
        return hubName;
    }

    public void setHubName(String hubName) {
        this.hubName = hubName;
    }

    public String getHubLocation() {
        return hubLocation;
    }

    public void setHubLocation(String hubLocation) {
        this.hubLocation = hubLocation;
    }

    public String getHubImg() {
        return hubImg;
    }

    public void setHubImg(String hubImg) {
        this.hubImg = hubImg;
    }

    public int getMaxTimeToRent() {
        return maxTimeToRent;
    }

    public void setMaxTimeToRent(int maxTimeToRent) {
        this.maxTimeToRent = maxTimeToRent;
    }

    public String getHubDescription() {
        return hubDescription;
    }

    public void setHubDescription(String hubDescription) {
        this.hubDescription = hubDescription;
    }

    public RentalType getRentalType() {
        return rentalType;
    }

    public void setRentalType(RentalType rentalType) {
        this.rentalType = rentalType;
    }

    public RentalStatus getRentalStatus() {
        return rentalStatus;
    }

    public void setRentalStatus(RentalStatus rentalStatus) {
        this.rentalStatus = rentalStatus;
    }
}
