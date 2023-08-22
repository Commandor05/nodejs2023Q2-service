import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request as Req } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Public } from './decorators/is-public.decorator';
import { AuthRefreshGuard } from './auth-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Public()
  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Public()
  @UseGuards(AuthRefreshGuard)
  @Post('/refresh')
  async refresh(@Request() req: Request) {
    console.log('user', req['user']);
    const user = req['user'];
    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }
    return this.authService.refrshToken(user);
  }
}
