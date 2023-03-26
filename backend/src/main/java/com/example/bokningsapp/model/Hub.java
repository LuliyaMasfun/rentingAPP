package com.example.bokningsapp.model;

import com.example.bokningsapp.enums.RentalStatus;
import com.example.bokningsapp.enums.RentalType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "hubs")
public class Hub {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String hubName;
    @Column
    private String hubLocation;
    @Column
    private String hubImg;
    @Column
    private int maxTimeToRent;
    @Column
    private String hubDescription;
    @Column
    @Enumerated
    private RentalType rentalType;
    @Column
    @Enumerated
    private RentalStatus rentalStatus;

    public Long getId() {
        return id;
    }

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

    @Override
    public String toString() {
        return "Hub{" +
                "id=" + id +
                ", hubName='" + hubName + '\'' +
                ", hubLocation='" + hubLocation + '\'' +
                ", hubImg='" + hubImg + '\'' +
                ", maxTimeToRent=" + maxTimeToRent +
                ", hubDescription='" + hubDescription + '\'' +
                ", rentalType=" + rentalType +
                ", rentalStatus=" + rentalStatus +
                '}';
    }
}
