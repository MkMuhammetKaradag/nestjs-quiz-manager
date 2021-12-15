import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Option, OptionDocument } from 'src/schemas/options.schema';
import { Question, QuestionDocument } from 'src/schemas/question.schema';
import { CreateOptionDto } from '../dto/CreateOption.dto';

@Injectable()
export class OptionService {
  constructor(
    @InjectModel(Option.name) private optionModel: Model<OptionDocument>,
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}

  async createOption(option: CreateOptionDto): Promise<string> {
    const newOption = new this.optionModel(option);
    await newOption.save();
    return newOption._id;
  }
}
