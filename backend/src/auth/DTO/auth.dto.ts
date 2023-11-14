import { IsNotEmpty, IsEmail, IsString, MaxLength, MinLength, IsUppercase, IsAlpha, IsNumber, Matches } from "class-validator";

export class signinLocalDTO {

    @IsNotEmpty()
    username:string; // can also be the email
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
    @MaxLength(20)
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'The password must contain at least one uppercase letter, one lowercase letter, and a digit'
  })
    password:string;
}

export class PasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre.',
  })
  password: string;
}


