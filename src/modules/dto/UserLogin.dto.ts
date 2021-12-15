import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { REGEX } from '../app.utils';

export class UserLoginrDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 16)
  @Matches(REGEX.PASSWORD_RULE, {
    message: REGEX.PASSWORD_RULE_MESSAGE,
  })
  password: string;
}
