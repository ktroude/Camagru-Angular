import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from "class-validator";


export class commentDTO {

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    content: string;

    @IsNumber()
    @IsPositive()
    postId: number
}