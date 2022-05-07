import { IsString } from 'class-validator';

export class SearchCategoriesDto {
  @IsString()
  name: string;
}
