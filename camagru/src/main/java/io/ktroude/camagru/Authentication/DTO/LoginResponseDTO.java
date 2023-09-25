package io.ktroude.camagru.Authentication.DTO;

import io.ktroude.camagru.User.AppUser;

public class LoginResponseDTO {
    
    private AppUser user;
    private String jwt;


    public LoginResponseDTO(){
        super();
    }

    public LoginResponseDTO(AppUser user, String jwt){
        this.user = user;
        this.jwt = jwt;
    }

    public AppUser getUser(){
        return this.user;
    }

    public void setUser(AppUser user){
        this.user = user;
    }

    public String getJwt(){
        return this.jwt;
    }

    public void setJwt(String jwt){
        this.jwt = jwt;
    }
}
