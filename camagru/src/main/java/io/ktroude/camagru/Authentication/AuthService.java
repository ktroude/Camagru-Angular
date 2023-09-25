package io.ktroude.camagru.Authentication;

import java.util.HashSet;
import java.util.Set;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.ktroude.camagru.Authentication.DTO.LoginResponseDTO;
import io.ktroude.camagru.Authentication.token.TokenService;
import io.ktroude.camagru.Role.Role;
import io.ktroude.camagru.Role.RoleRepository;
import io.ktroude.camagru.User.AppUser;
import io.ktroude.camagru.User.UserRepository;

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

    public LoginResponseDTO loginUser(String username, String password){
        try{
            System.out.println("username ===" + username);
            System.out.println("password ===" + password);
            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
            );
            System.out.println("AUTH ============== " + auth);
            String token = tokenService.generateJwt(auth);
            System.out.println("TOKEN ========= " + token);
            return new LoginResponseDTO(userRepository.findByUsername(username).get(), token);
        } catch(AuthenticationException e){
            return new LoginResponseDTO(null, "");
        }
    }

}
