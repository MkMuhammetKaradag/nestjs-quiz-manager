import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseConfig } from './config/mongoose.config';
import { QuizModule } from './modules/quiz/quiz.module';
import { OptionService } from './modules/option/option.service';
import { OptionController } from './modules/option/option.controller';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [QuizModule, MongooseModule.forRoot(MongooseConfig), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
