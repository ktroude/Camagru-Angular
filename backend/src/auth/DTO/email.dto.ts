import { IsNotEmpty, IsEmail } from "class-validator";

export class EmailDTO {

    @IsNotEmpty()
    @IsEmail()
    email:string;
}