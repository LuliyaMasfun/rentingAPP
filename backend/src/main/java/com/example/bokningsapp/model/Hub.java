package com.example.bokningsapp.model;

import com.example.bokningsapp.enums.RentalStatus;
import com.example.bokningsapp.enums.RentalType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "hubs")
public class Hub {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String hubName;
    private String hubLocation;

    private String hubImg;

    private int maxTimeToRent;

    private String hubDescription;

    @Enumerated
    private RentalType rentalType;

    @Enumerated
    private RentalStatus rentalStatus;

    @ManyToMany(mappedBy = "hubs")
    private Set<User> users = new HashSet<>();

    public Hub() {
    }

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

    public Set<User> getUserSet() {
        return userSet;
    }

    public void setUserSet(Set<User> userSet) {
        this.userSet = userSet;
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
