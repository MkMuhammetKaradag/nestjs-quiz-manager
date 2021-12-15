import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from 'src/schemas/question.schema';
import { Quiz, QuizDocument } from 'src/schemas/quiz.schema';
import { CreateQuestionDto } from '../dto/CreateQuestion.dto';
import { UpdateQuestiontoOptionDto } from '../dto/UpdateQuestiontoOption.dto';
import { UpdateQuizDto } from '../dto/UpdateQuiz.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    @InjectModel(Quiz.name) private quiznModel: Model<QuizDocument>,
  ) {}
  async getAllQuestions(): Promise<Question[]> {
    return this.questionModel.find().populate('optionsId');
    // .populate({
    //   path: 'quizId',
    //   match: { title: 'Final' },
    //   select: 'title',
    // })
    // .exec();
  }

  async getQuestions(quizId: string): Promise<Question[]> {
    const questions = await this.questionModel.find({ quizId }).exec();
    return questions;
  }

  async createQuestion(questionData: CreateQuestionDto): Promise<string> {
    const createQuestion = new this.questionModel(questionData);
    const newQuestion = await createQuestion.save();

    return String(newQuestion?._id);
  }

  async getQuestionById(_id: string): Promise<Question> {
    const question = await this.questionModel.findById(_id);
    return question;
  }
  async updateQuestiontoOption(
    questionData: UpdateQuestiontoOptionDto,
  ): Promise<any> {
    const oldQuestion = await this.getQuestionById(questionData.questionId);
    const optionsData = [...oldQuestion.optionsId, questionData.optionsId];
    const question = this.questionModel.updateOne(
      { _id: questionData.questionId },
      { $set: { optionsId: optionsData } },
    );

    return question;
  }
}
