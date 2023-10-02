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

import io.ktroude.camagru.Authentication.token.TokenService;
import io.ktroude.camagru.Role.Role;
import io.ktroude.camagru.Role.RoleRepository;
import io.ktroude.camagru.User.AppUser;
import io.ktroude.camagru.User.UserRepository;
import jakarta.servlet.http.Cookie;
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

    public String loginUser(String username, String password, HttpServletResponse response) {
    try {
        Authentication auth = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(username, password)
        );
        String token = tokenService.generateJwt(auth);
        return token;
    } catch (AuthenticationException e) {
        return null;
    }
}

    public String logoutUser(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt-token", "");
        cookie.setPath("/logout");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return "redirect:/login";
    }







}
