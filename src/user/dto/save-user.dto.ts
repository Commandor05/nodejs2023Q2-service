import { IsNotEmpty } from 'class-validator';

export class SaveUserDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  hash: string;

  @IsNotEmpty()
  salt: string;
}
