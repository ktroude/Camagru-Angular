import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UsernameDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(3)
  username: string;
}
