import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length
} from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: '"name" should be a valid string' })
  @IsOptional()
  @Length(2, 125)
  name?: string;

  @IsString({ message: '"username" should be a valid string' })
  @IsOptional()
  @Length(2, 45)
  username?: string;

  @IsString({ message: '"email" should be a valid string' })
  @IsOptional()
  @Length(5, 125)
  email?: string;

  @IsString({ message: '"password" should be a valid string' })
  @IsOptional()
  @Length(8, 125)
  password?: string;
}
