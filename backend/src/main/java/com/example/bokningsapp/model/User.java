package com.example.bokningsapp.model;

import com.example.bokningsapp.enums.AccountStatus;
import com.example.bokningsapp.enums.ERole;
import com.example.bokningsapp.token.VerificationToken;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.NaturalId;
import java.time.LocalDateTime;
import java.util.List;

@Table
@Entity(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String firstName;
    @Column
    private String lastName;
    @NaturalId
    @Column
    private String email;
    @Column
    private String profileImg;

    @Column
    private Long socialSecurityNumber;

    @Column
    private String phoneNumber;

    @Column
    private String address;

    @Column
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm")
    @CreationTimestamp
    private LocalDateTime createdDate;

    @Column
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm")
    @CreationTimestamp
    private LocalDateTime updatedDate;

    @Column
    private String password;

    @Column
    private String birthDate;
    @Column
    @Enumerated(EnumType.STRING)
    private AccountStatus accountStatus;
    @Column
    @Enumerated(EnumType.STRING)
    private ERole role;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<EquipmentBooking> equipmentBookings;
    private boolean emailVerified = false;
    @OneToOne(targetEntity = VerificationToken.class, fetch = FetchType.EAGER)
    private VerificationToken verificationToken;
    private Boolean enabled = false;

    public User(String firstName, String lastName, String email, List<EquipmentBooking> equipmentBookings, String profileImg, Long socialSecurityNumber,
                String phoneNumber,String address,  LocalDateTime createdDate, LocalDateTime updatedDate, String password, String birthDate, boolean emailVerified,
                VerificationToken verificationToken,Boolean enabled) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.equipmentBookings = equipmentBookings;
        this.profileImg =  profileImg;
        this.socialSecurityNumber = socialSecurityNumber;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.createdDate = createdDate;
        this.updatedDate =updatedDate;
        this.password = password;
        this.birthDate = birthDate;
        this.emailVerified = emailVerified;
        this.verificationToken=verificationToken;
        this.enabled = enabled;

    }

    public User() {
    }
    public User(String name, String email, String password) {
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<EquipmentBooking> getEquipmentBookings() {
        return equipmentBookings;
    }

    public void setEquipmentBookings(List<EquipmentBooking> equipmentBookings) {
        this.equipmentBookings = equipmentBookings;
    }

    public String getProfileImg() {
        return profileImg;
    }

    public void setProfileImg(String profileImg) {
        this.profileImg = profileImg;
    }

    public Long getSocialSecurityNumber() {
        return socialSecurityNumber;
    }

    public void setSocialSecurityNumber(Long socialSecurityNumber) {
        this.socialSecurityNumber = socialSecurityNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(LocalDateTime updatedDate) {
        this.updatedDate = updatedDate;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public AccountStatus getAccountStatus() {
        return accountStatus;
    }

    public void setAccountStatus(AccountStatus accountStatus) {
        this.accountStatus = accountStatus;
    }

    public ERole getRole() {
        return role;
    }

    public void setRole(ERole role) {
        this.role = role;
    }

    public boolean isEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public VerificationToken getVerificationToken() {
        return verificationToken;
    }

    public void setVerificationToken(VerificationToken verificationToken) {
        this.verificationToken = verificationToken;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", profileImg='" + profileImg + '\'' +
                ", socialSecurityNumber=" + socialSecurityNumber +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", adress='" + address + '\'' +
                ", createdDate=" + createdDate +
                ", updatedDate=" + updatedDate +
                ", password='" + password + '\'' +
                ", birthDate=" + birthDate +
                ", accountStatus=" + accountStatus +
                ", equipmentBookings=" + equipmentBookings +
                '}';
    }
}
