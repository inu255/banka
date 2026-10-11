import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsUUID()
  @IsNotEmpty()
  brandId: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @Type(() => Date)
  @IsDate()
  openDate: Date;

  @IsOptional()
  @IsString()
  @MaxLength(2_000_000)
  @Matches(/^data:image\//)
  image?: string;
}
