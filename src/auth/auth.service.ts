import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { UserTokenPayloadDto } from './dto/user-token-payload.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { login, password } = loginUserDto;

    const user = await this.userService.findOneByLogin(login);
    if (!user) {
      // it could be NOT_FOUND but in assugnment it's FORBIDDEN
      throw new HttpException(`User not found`, HttpStatus.FORBIDDEN);
    }

    const { hash: currentPasswordHash, salt } = user;
    const { hash: passwordHash } = await this.userService.hashPassword(
      password,
      salt,
    );

    if (currentPasswordHash !== passwordHash) {
      throw new HttpException(`Wrong password`, HttpStatus.FORBIDDEN);
    }

    return this.getUserTokens(user);
  }

  async signup(createUserDto: CreateUserDto) {
    const { login } = createUserDto;
    const user = await this.userService.findOneByLogin(login);

    if (user) {
      throw new HttpException(`User already exists`, HttpStatus.CONFLICT);
    }

    return await this.userService.create(createUserDto);
  }

  async refrshToken(userTokenPayloadDto: UserTokenPayloadDto) {
    const { login } = userTokenPayloadDto;

    const user = await this.userService.findOneByLogin(login);
    if (!user) {
      // it could be NOT_FOUND but in assugnment it's FORBIDDEN
      throw new HttpException(`User not found`, HttpStatus.FORBIDDEN);
    }

    return this.getUserTokens(user);
  }

  private async getUserTokens(user: User) {
    const payload: UserTokenPayloadDto = {
      userId: user.id,
      login: user.login,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('auth.jwtSecretRefreshKey'),
        expiresIn: this.configService.get<string>(
          'auth.tokenRefreshExpireTime',
        ),
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
