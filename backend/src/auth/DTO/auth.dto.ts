import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class signinLocalDTO {

    @IsNotEmpty()
    @IsEmail()
    email:string; // can also be the username
    @IsNotEmpty()
    @IsString()
    password:string;
}

export class signupLocalDTO {
    
    @IsNotEmpty()
    @IsString()
    username:string;
    @IsNotEmpty()
    @IsEmail()
    email:string;
    @IsNotEmpty()
    @IsString()
    password:string;
}

