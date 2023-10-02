package io.ktroude.camagru.Authentication;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.ktroude.camagru.Authentication.token.TokenService;
import io.ktroude.camagru.Role.Role;
import io.ktroude.camagru.Role.RoleRepository;
import io.ktroude.camagru.User.AppUser;
import io.ktroude.camagru.User.UserRepository;
import jakarta.servlet.http.HttpServletResponse;

@Service
@Transactional
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;

    public AppUser registerUser(String username, String email, String password){
        String encodedPassword = passwordEncoder.encode(password);
        Role userRole = roleRepository.findByAuthority("USER").get();
        Set<Role> authorities = new HashSet<>();
        authorities.add(userRole);
        return userRepository.save(new AppUser(0, username, email, encodedPassword, authorities));
    }

    public ResponseEntity<String> loginUser(String username, String password, HttpServletResponse response){
    try {
        Authentication auth = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(username, password)
        );
        String token = tokenService.generateJwt(auth);
        if (token != null && !token.isEmpty()) {
            Map<String, Object> jsonResponse = new HashMap<>();
            jsonResponse.put("token", token);
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonString = objectMapper.writeValueAsString(jsonResponse);
            response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
            response.setHeader("Expires", "0"); // Proxies.
            return ResponseEntity.ok(jsonString);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password or username");
        }
    } catch (AuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password or username");
    } catch (JsonProcessingException e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Json Processing Exception");
    }
}


}
