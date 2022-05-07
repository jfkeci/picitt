import { IsDateString, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString({ message: '"name" should be a valid string' })
  @IsNotEmpty({ message: '"name" should not be empty' })
  @Length(2, 125)
  name: string;

  @IsString({ message: '"username" should be a valid string' })
  @IsNotEmpty({ message: '"username" should not be empty' })
  @Length(2, 45)
  username: string;

  @IsString({ message: '"email" should be a valid string' })
  @IsNotEmpty({ message: '"email" should not be empty' })
  @Length(5, 125)
  email: string;

  @IsString({ message: '"password" should be a valid string' })
  @IsNotEmpty({ message: '"password" should not be empty' })
  @Length(8, 125)
  password: string;

  @IsDateString({ message: '"birthdate" should be a valid date string' })
  @IsNotEmpty({ message: '"birthdate" should not be empty' })
  birthdate: Date;
}
