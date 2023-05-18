package com.example.bokningsapp.model;

import com.example.bokningsapp.enums.*;
import com.fasterxml.jackson.databind.node.LongNode;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import org.apache.commons.lang3.RandomStringUtils;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "rentals")
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column
    private String ean13;
   @Column
    private String rentalNumber;
    @Column
    private String name;
    @Column
    private String location;
    @Column
    private String image;
    @Column
    private Long maxTimeToRent;
    @Column(columnDefinition = "VARCHAR(1000)")
    private String description;
    @Column
    @Enumerated
    private RentalType rentalType;
    @Column
    @Enumerated
    private RentalStatus rentalStatus;
    @Column
    private boolean availableToRent;
    @Column
    @Nullable
    private int maxAmountOfPeople;
    @Column
    @Nullable
    private String brand;
    @Column
    @Enumerated
    @Nullable
    private EquipmentType equipmentType;
    @Column
    @Enumerated
    @Nullable
    private HubType hubType;
    @Column
    @Enumerated
    @Nullable
    private EventType eventType;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User createdBy;
    @Column
    private LocalDate createdOn = LocalDate.now();
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable=false, updatable=false)
    @Nullable
    private User updatedBy;
    @Column
    @Nullable
    private LocalDate updatedOn;

    private String generateRentalNumber() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        String rentalNumber = RandomStringUtils.random(8, chars);
        return rentalNumber;
    }

    public Rental(String name, String location, String image, Long maxTimeToRent, String description, RentalType rentalType, RentalStatus rentalStatus, boolean availableToRent, int maxAmountOfPeople, String brand, EquipmentType equipmentType, HubType hubType, EventType eventType, User createdBy, LocalDate createdOn, User updatedBy, LocalDate updatedOn) {
        this.name = name;
        this.location = location;
        this.image = image;
        this.maxTimeToRent = maxTimeToRent;
        this.description = description;
        this.rentalType = rentalType;
        this.rentalStatus = rentalStatus;
        this.availableToRent = availableToRent;
        this.maxAmountOfPeople = maxAmountOfPeople;
        this.brand = brand;
        this.equipmentType = equipmentType;
        this.hubType = hubType;
        this.eventType = eventType;
        this.createdBy = createdBy;
        this.createdOn = createdOn;
        this.updatedBy = updatedBy;
        this.updatedOn = updatedOn;
    }

    public Rental() {
    }

    public Long getId() {
        return id;
    }

    public String getEan13() {
        return ean13;
    }

    public void setEan13(String ean13) {
        this.ean13 = ean13;
    }

    public String getRentalNumber() {
        return rentalNumber;
    }

    public void setRentalNumber(String rentalNumber) {
        this.rentalNumber = rentalNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Long getMaxTimeToRent() {
        return maxTimeToRent;
    }

    public void setMaxTimeToRent(Long maxTimeToRent) {
        this.maxTimeToRent = maxTimeToRent;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public boolean isAvailableToRent() {
        return availableToRent;
    }

    public void setAvailableToRent(boolean availableToRent) {
        this.availableToRent = availableToRent;
    }

    public int getMaxAmountOfPeople() {
        return maxAmountOfPeople;
    }

    public void setMaxAmountOfPeople(int maxAmountOfPeople) {
        this.maxAmountOfPeople = maxAmountOfPeople;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public EquipmentType getEquipmentType() {
        return equipmentType;
    }

    public void setEquipmentType(EquipmentType equipmentType) {
        this.equipmentType = equipmentType;
    }

    public HubType getHubType() {
        return hubType;
    }



    public void setHubType(HubType hubType) {
        this.hubType = hubType;
    }

    public EventType getEventType() {
        return eventType;
    }

    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public User getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(User updatedBy) {
        this.updatedBy = updatedBy;
    }

    public LocalDate getUpdatedOn() {
        return updatedOn;
    }

    public void setUpdatedOn(LocalDate updatedOn) {
        this.updatedOn = updatedOn;
    }

    @Override
    public String toString() {
        return "Rental{" +
                "id=" + id +
                ", ean13=" + ean13 +
                ", rentalNumber='" + rentalNumber + '\'' +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", image='" + image + '\'' +
                ", maxTimeToRent=" + maxTimeToRent +
                ", description='" + description + '\'' +
                ", rentalType=" + rentalType +
                ", rentalStatus=" + rentalStatus +
                ", availableToRent=" + availableToRent +
                ", maxAmountOfPeople=" + maxAmountOfPeople +
                ", brand='" + brand + '\'' +
                ", equipmentType=" + equipmentType +
                ", hubType=" + hubType +
                ", eventType=" + eventType +
                ", createdBy='" + createdBy + '\'' +
                ", createdOn=" + createdOn +
                ", updatedBy='" + updatedBy + '\'' +
                ", updatedOn=" + updatedOn +
                '}';
    }
}
