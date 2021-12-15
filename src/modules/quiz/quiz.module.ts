import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Option, OptionSchema } from 'src/schemas/options.schema';
import { Question, QuestionSchema } from 'src/schemas/question.schema';
import { Quiz, QuizSchema } from 'src/schemas/quiz.schema';
import { OptionController } from '../option/option.controller';
import { OptionService } from '../option/option.service';
import { QuestionController } from '../question/question.controller';
import { QuestionService } from '../question/question.service';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema },
      { name: Question.name, schema: QuestionSchema },
      { name: Option.name, schema: OptionSchema },
    ]),
  ],
  controllers: [QuizController, QuestionController, OptionController],
  providers: [QuizService, QuestionService, OptionService],
})
export class QuizModule {}
