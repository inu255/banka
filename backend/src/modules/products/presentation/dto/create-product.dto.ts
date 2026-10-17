import { Transform } from 'class-transformer';
import {
  IsDateString,
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

  @IsUUID('4')
  @IsNotEmpty()
  brandId: string;

  @IsUUID('4')
  @IsNotEmpty()
  categoryId: string;

  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  openDate: string;

  @IsOptional()
  @IsString()
  @MaxLength(2_000_000)
  @Matches(/^data:image\//)
  image?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  @Transform(({ value }) =>
    typeof value === 'string' && value.trim() === '' ? null : value,
  )
  comment?: string | null;
}
