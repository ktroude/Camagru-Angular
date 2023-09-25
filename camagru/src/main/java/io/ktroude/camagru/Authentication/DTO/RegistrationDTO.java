package io.ktroude.camagru.Authentication.DTO;

public class RegistrationDTO {
    private String username;
    private String email;
    private String password;

    public RegistrationDTO(){
        super();
    }

    public RegistrationDTO(String username, String email, String password){
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword(){
        return this.password;
    }

    public String getEmail(){
        return this.email;
    }

    public String getUsername(){
        return this.username;
    }

    public String toString(){
        return "Registration data: username" + this.username + "| email:" + this.email + "| password:" + this.password;
    }
}
