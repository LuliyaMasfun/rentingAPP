package com.example.bokningsapp.model;

import com.example.bokningsapp.enums.AccountStatus;
import com.example.bokningsapp.enums.ERole;
import com.example.bokningsapp.token.VerificationToken;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;


@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String firstName;
    @Column
    private String lastName;
    @Column
    private String email;
    @Column
    private String profileImg;

    @Column
    private Long socialSecurityNumber;

    @Column
    private String phoneNumber;

    @Column
    private String adress;

    @Column
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm")
    private LocalDateTime createdDate;

    @Column
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm")
    private LocalDateTime updatedDate;

    @Column
    private String password;

    @Column
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate birthDate;
    @Column
    private AccountStatus accountStatus;
    @Column
    @Enumerated(EnumType.STRING)
    private ERole role;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<EquipmentBooking> equipmentBookings;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "verification_token_id", referencedColumnName = "id")
    private VerificationToken verificationToken;

    @Column
    private boolean enabled;


    public User(String name, String lastName, String email, List<EquipmentBooking> equipmentBookings, String profileImg, Long socialSecurityNumber,
                String phoneNumber,String adress,  LocalDateTime createdDate, LocalDateTime updatedDate, String password, LocalDate birthDate, VerificationToken verificationToken, boolean enabled) {
        this.firstName = name;
        this.lastName = lastName;
        this.email = email;
        this.equipmentBookings = equipmentBookings;
        this.profileImg =  profileImg;
        this.socialSecurityNumber = socialSecurityNumber;
        this.phoneNumber = phoneNumber;
        this.adress = adress;
        this.createdDate = createdDate;
        this.updatedDate =updatedDate;
        this.password = password;
        this.birthDate = birthDate;
        this.verificationToken = verificationToken;
        this.enabled = enabled;

    }

    public User() {
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

    public String getAdress() {
        return adress;
    }

    public void setAdress(String address) {
        this.adress = address;
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
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

    public VerificationToken getVerificationToken() {
        return verificationToken;
    }

    public void setVerificationToken(VerificationToken verificationToken) {
        this.verificationToken = verificationToken;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
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
                ", adress='" + adress + '\'' +
                ", createdDate=" + createdDate +
                ", updatedDate=" + updatedDate +
                ", password='" + password + '\'' +
                ", birthDate=" + birthDate +
                ", accountStatus=" + accountStatus +
                ", equipmentBookings=" + equipmentBookings +
                '}';
    }
}
