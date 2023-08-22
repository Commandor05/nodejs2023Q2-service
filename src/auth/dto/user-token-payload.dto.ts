import { IsNotEmpty } from 'class-validator';

export class UserTokenPayloadDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  login: string;
}
