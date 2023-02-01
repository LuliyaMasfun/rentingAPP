package com.example.bokningsapp.validator;

import org.springframework.expression.ParseException;
import org.springframework.stereotype.Service;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class RegistrationRequestValidator {
    private static final String EMAIL_REGEX = "^[\\w-\\+]+(\\.[\\w]+)*@[\\w-]+(\\.[\\w]+)*(\\.[a-z]{2,})$";
    private static Pattern pattern;
    private Matcher matcher;


    public boolean validateFirstName(String firstName) {
        Pattern pattern = Pattern.compile("^[A-Z][a-z]{1,30}$");
        Matcher matcher = pattern.matcher(firstName);

        return matcher.matches();
    }
    public boolean validateLastName(String lastName) {
        Pattern pattern = Pattern.compile("^[A-Z][a-z]{1,30}$");
        Matcher matcher = pattern.matcher(lastName);

        return matcher.matches();
    }
    public boolean validateBirthday(String birthday) {
        // Validate that the birthday is in the correct format (MM/dd/yyyy)
        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
        dateFormat.setLenient(false);
        try {
            dateFormat.parse(birthday);
        } catch (ParseException | java.text.ParseException e) {
            return false;
        }
        // Validate that the birthday is not in the future
        Calendar today = Calendar.getInstance();
        Calendar birthdayCalendar = Calendar.getInstance();
        birthdayCalendar.setTime(dateFormat.parse(birthday, new ParsePosition(0)));
        if (birthdayCalendar.after(today)) {
            return false;
        }

        return true;
    }

    public Pattern EmailValidation() {
        pattern = Pattern.compile(EMAIL_REGEX, Pattern.CASE_INSENSITIVE);
        return pattern;
    }

    public boolean validateEmail(String email) {
        matcher = pattern.matcher(email);
        return matcher.matches();
    }

    public boolean validatePassword(String password) {
        String pattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$";
        Pattern p = Pattern.compile(pattern);
        Matcher m = p.matcher(password);
        return m.matches();
    }

    public boolean validateAddress(String address) {
        if (address == null || address.isEmpty()) {
            return false;
        }
        Pattern pattern = Pattern.compile("^[\\w\\s]+\\s\\d+[a-zA-Z]?,\\s\\d{5}\\s[\\w\\s]+$");
        Matcher matcher = pattern.matcher(address);
        if(!matcher.matches()) {
            return false;
        }
        // Use a library or API to verify the postal code and city name
        return true;
    }

    public boolean validatePhoneNumber(String phoneNumber) {
        String pattern = "^(\\+46|0)[0-9]{9}$";
        Pattern p = Pattern.compile(pattern);
        Matcher m = p.matcher(phoneNumber);
        return m.matches();
    }




}
