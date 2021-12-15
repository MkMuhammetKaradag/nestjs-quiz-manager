import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        // schema: UserSchema,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', async function (done) {
            if (this.isModified('password')) {
              const salt = await bcrypt.genSalt();
              const password = await bcrypt.hash(this.get('password'), salt);
              this.set('password', password);
            }
            done();
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
