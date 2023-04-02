package com.example.bokningsapp.service.emailService;

import com.example.bokningsapp.model.ActivationToken;
import com.example.bokningsapp.model.User;
import com.example.bokningsapp.service.activationTokenService.ActivationTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender emailSender;

    private final ActivationTokenService activationTokenService;

    @Autowired
    public EmailService(JavaMailSender emailSender, ActivationTokenService activationTokenService) {
        this.emailSender = emailSender;
        this.activationTokenService = activationTokenService;
    }


    //todo checka att denna länk funkar, behöver testa att activerings url stämmer med frontend
    public void sendActivationEmail(User user) {
        ActivationToken activationToken = activationTokenService.createActivationToken(user);
        String activationUrl = "http://localhost:3000/activate/" + activationToken.getToken();
        String subject = "Activate your account";
        String body = "Hello there, an account has been set up for you at booksStation. Please click on the following link to activate your account:\n\n"
                + activationUrl + "\n\n"
                + "If you did not create an account, please ignore this email.\n\n"
                + "Regards,\nThe Admin Team";

        sendEmail(user.getEmail(), subject, body);
    }

    private void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("robert.tenglund@sustainit.se");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        emailSender.send(message);
        System.out.println("Success! Mail sent...");
    }





}
