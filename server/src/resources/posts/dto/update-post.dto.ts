import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

class LocationObject {
  @IsString()
  @IsNotEmpty()
  lat: string;
  @IsString()
  @IsNotEmpty()
  lng: string;
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdatePostDto {
  @IsString({ message: '"title" should be a valid string' })
  @Length(1, 127)
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString({ message: '"title" should be a valid string' })
  @Length(1, 255)
  @IsOptional()
  body?: string;

  @ValidateNested()
  @Type(() => LocationObject)
  @IsOptional()
  location?: LocationObject;

  @IsNumber()
  @IsOptional()
  category?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @IsString({ each: true })
  @ArrayMaxSize(10)
  @ArrayMinSize(1)
  images: Array<string>;

  @IsArray()
  @ValidateNested({ each: true })
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
