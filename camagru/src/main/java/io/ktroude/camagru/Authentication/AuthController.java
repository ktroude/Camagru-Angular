package io.ktroude.camagru.Authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.ktroude.camagru.Authentication.DTO.LoginResponseDTO;
import io.ktroude.camagru.Authentication.DTO.RegistrationDTO;
import io.ktroude.camagru.User.AppUser;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {
    
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public AppUser registerUser(@RequestBody RegistrationDTO data){
        return authService.registerUser(data.getUsername(), data.getEmail(), data.getPassword());
    }

    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody RegistrationDTO data) {
        return authService.loginUser(data.getUsername(), data.getPassword());
    }

    
}
