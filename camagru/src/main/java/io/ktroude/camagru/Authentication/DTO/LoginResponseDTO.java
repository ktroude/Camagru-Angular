package io.ktroude.camagru.Authentication.DTO;

import io.ktroude.camagru.User.AppUser;

public class LoginResponseDTO {
    
    private Integer id;
    private String username;
    private String email;


    public LoginResponseDTO(){
        super();
    }

    public LoginResponseDTO(AppUser user){
        this.id = user.getUserId();
        this.username = user.getUsername();
        this.email = user.getEmail();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
