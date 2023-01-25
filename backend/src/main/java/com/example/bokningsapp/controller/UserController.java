package com.example.bokningsapp.controller;

import com.example.bokningsapp.model.User;
import com.example.bokningsapp.repository.UserRepository;
import com.example.bokningsapp.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {


    private final UserRepository userRepository;
    private final UserServiceImpl userServiceImpl;

    @Autowired
    public UserController(UserRepository userRepository, UserServiceImpl userServiceImpl) {
        this.userRepository = userRepository;
        this.userServiceImpl = userServiceImpl;
    }

    @GetMapping(value = "/users")
    public ResponseEntity<List<User>> getAllUsers(){
        try {
          List<User> userList = userServiceImpl.getAllUsers();

          if (!userList.isEmpty()){

          return new ResponseEntity<>(userList,HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);


        }
    }

//    @GetMapping(value = "user/{id}")
//    public ResponseEntity<User>getUser(@PathVariable long id) {
//
//        User user = userRepository.getReferenceById(id);
//
//    }


    @PostMapping(value = "/user")
    public ResponseEntity<User> addUser(@RequestBody User user){


        try{

          if(userRepository.existsByEmail(user.getEmail())){
              return new ResponseEntity<>(user,HttpStatus.CONFLICT);
          }
          else{
              User savedUser = new User(user.getName(),user.getLastName(),user.getEmail(), user.getEquipmentBookings());
              userServiceImpl.saveUser(savedUser);
              return new ResponseEntity<>(savedUser,HttpStatus.CREATED);
          }


        } catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping(value = "user/{id}")
    public ResponseEntity<User> updateUser (@PathVariable long id, @RequestBody User user) {
        User updatedUser = userRepository.getReferenceById(id);

        try {
            updatedUser.setName(user.getName());
            updatedUser.setLastName(user.getLastName());
            updatedUser.setEmail(user.getEmail());

            userRepository.save(updatedUser);

            return new ResponseEntity<>(updatedUser,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
    @DeleteMapping(value = "user/{id}")
    public ResponseEntity<Long> deleteUser(@PathVariable long id){

        User deletedUser = userRepository.getReferenceById(id);
        try{
            if (userRepository.existsById(id)) {
                userRepository.delete(deletedUser);
                return new ResponseEntity<>(id,HttpStatus.OK);
            } else {
                return new ResponseEntity<>(id,HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }


}
