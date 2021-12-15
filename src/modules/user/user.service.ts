import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserRegisterDto } from '../dto/UserRegister.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async doUserRegister(userRegister: UserRegisterDto): Promise<User> {
    // const salt = await bcrypt.genSalt();
    // const password = await bcrypt.hash(userRegister.password, salt);
    const newUser = new this.userModel({
      name: userRegister.name,
      email: userRegister.email,
      password: userRegister.password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return await newUser.save();
  }
}
