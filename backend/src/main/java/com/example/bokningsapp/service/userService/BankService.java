package com.example.bokningsapp.service.userService;

import com.example.bokningsapp.model.User;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BankService {

    @PreAuthorize("hasRole('ROLE_USER')")
    List<User> findAccounts();
}
