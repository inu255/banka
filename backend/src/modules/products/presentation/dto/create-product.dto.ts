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

  @IsUUID()
  @IsNotEmpty()
  brandId: string;

  @IsUUID()
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
}
