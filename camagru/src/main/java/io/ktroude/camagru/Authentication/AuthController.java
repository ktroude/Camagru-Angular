package io.ktroude.camagru.Authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;

import io.ktroude.camagru.Authentication.DTO.LoginDTO;
import io.ktroude.camagru.Authentication.DTO.RegistrationDTO;
import io.ktroude.camagru.User.AppUser;
import jakarta.servlet.http.HttpServletResponse;

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
    public ResponseEntity<String> loginUser(@RequestBody LoginDTO data, HttpServletResponse response) throws JsonProcessingException {
        return authService.loginUser(data.getUsername(), data.getPassword(), response);
    }
    
}
