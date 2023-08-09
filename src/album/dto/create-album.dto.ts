import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  artistId: string | null; // refers to Artist
}
