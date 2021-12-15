import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Question } from 'src/schemas/question.schema';
import { CreateQuestionDto } from '../dto/CreateQuestion.dto';
import { QuizService } from '../quiz/quiz.service';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly quizService: QuizService,
  ) {}
  @Post('')
  @UsePipes(ValidationPipe)
  async saveQuestion(@Body() question: CreateQuestionDto): Promise<string> {
    const questionId = await this.questionService.createQuestion(question);

    this.quizService.updateQuiz({
      quizId: question.quizId,
      questionId: questionId,
    });
    return questionId;
  }

  @Get('')
  async getAllQuestion() {
    return this.questionService.getAllQuestions();
  }
  @Get(':quizId')
  async getQuestion(@Param('quizId') quizId: string) {
    return this.questionService.getQuestions(quizId);
  }
}
