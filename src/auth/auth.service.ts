import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
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

    const payload = { sub: user.id, username: user.login };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  async signup(createUserDto: CreateUserDto) {
    const { login } = createUserDto;
    const user = await this.userService.findOneByLogin(login);

    if (user) {
      throw new HttpException(`User already exists`, HttpStatus.CONFLICT);
    }

    return await this.userService.create(createUserDto);
  }
}
