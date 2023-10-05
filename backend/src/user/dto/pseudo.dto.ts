import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  Matches,
} from 'class-validator';

export class PseudoDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  pseudo: string;
}
