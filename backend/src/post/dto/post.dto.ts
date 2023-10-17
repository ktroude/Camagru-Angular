import { IsString, MaxLength } from "class-validator";

export class PostDTO {
  @IsString()
  @MaxLength(200)
  description: string;
}