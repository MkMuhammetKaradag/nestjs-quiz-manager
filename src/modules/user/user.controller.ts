import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { SETTINGS } from '../app.utils';
import { UserLoginrDto } from '../dto/UserLogin.dto';
import { UserRegisterDto } from '../dto/UserRegister.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('/register')
  doUserRegister(
    @Body(SETTINGS.VALIDATION_PIPE)
    userRegister: UserRegisterDto,
  ): Promise<User> {
    const user = this.userService.doUserRegister(userRegister);

    return user;
  }

  @Post('login')
  async doUserLogin(
    @Body(SETTINGS.VALIDATION_PIPE) userLogin: UserLoginrDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.userFindOne({ email: userLogin.email });
    if (!user) {
      throw new BadRequestException('invalid credentials');
    }
    if (!(await bcrypt.compare(userLogin.password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: user._id });
    response.cookie('jwt', jwt, { httpOnly: true });
    return {
      message: 'Success',
    };
  }

  @Get('')
  async getUser(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.userService.getUser({ _id: data['id'] });
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'Success',
    };
  }
}
