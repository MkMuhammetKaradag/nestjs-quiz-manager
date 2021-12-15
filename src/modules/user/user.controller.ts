import {
  Body,
  Controller,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { SETTINGS } from '../app.utils';
import { UserRegisterDto } from '../dto/UserRegister.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  doUserRegister(
    @Body(SETTINGS.VALIDATION_PIPE)
    userRegister: UserRegisterDto,
  ): Promise<User> {
    return this.userService.doUserRegister(userRegister);
  }
}
