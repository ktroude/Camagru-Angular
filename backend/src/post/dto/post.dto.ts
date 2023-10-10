import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class PostDTO {

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  description: string;
}