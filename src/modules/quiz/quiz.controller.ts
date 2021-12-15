import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Quiz } from 'src/schemas/quiz.schema';
import { CreateQuizDto } from '../dto/CreateQuiz.dto';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('/')
  getAllQuiz(): Promise<Quiz[]> {
    return this.quizService.getAllQuiz();
  }

  @Post('/create')
  // @HttpCode(200)
  @UsePipes(ValidationPipe)
  createQuiz(@Body() quizData: CreateQuizDto): Promise<Quiz> {
    return this.quizService.createQuiz(quizData);
  }
  @Get(':quizId')
  async getQuestion(@Param('quizId') quizId: string) {
    return this.quizService.getQuizById(quizId);
  }
}
