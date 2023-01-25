package com.example.bokningsapp;

import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;


// For debugging only
@Controller
public class TestController {

    @GetMapping("/register")
    public String displayRegisterUser() {

        // Todo - CREATE
        return "/register";

    }

    @PostMapping("/register")
    public String registerUser(User user, BindingResult result, Model model) {

        if(result.hasErrors()) {
            return "register";
        }

        // TODO - ERROR HANDLING

        return "/home";
    }

}