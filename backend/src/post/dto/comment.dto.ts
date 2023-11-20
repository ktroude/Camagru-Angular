import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from "class-validator";


export class commentDTO {

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNumber()
    @IsPositive()
    postId: number
}