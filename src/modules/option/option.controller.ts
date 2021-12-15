import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOptionDto } from '../dto/CreateOption.dto';
import { QuestionService } from '../question/question.service';
import { OptionService } from './option.service';

@Controller('question/option')
export class OptionController {
  constructor(
    private readonly optionService: OptionService,
    private readonly questionService: QuestionService,
  ) {}

  @Post('')
  @UsePipes(ValidationPipe)
  saveOptioToQuestion(@Body() createOption: CreateOptionDto) {
    this.optionService
      .createOption(createOption)
      .then((res) => {
        const response = this.questionService.updateQuestiontoOption({
          questionId: createOption.questionId,
          optionsId: res,
        });

        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
