import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz, QuizDocument } from 'src/schemas/quiz.schema';
import { CreateQuizDto } from '../dto/CreateQuiz.dto';
import { UpdateQuizDto } from '../dto/UpdateQuiz.dto';

@Injectable()
export class QuizService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<QuizDocument>) {}
  async getAllQuiz(): Promise<Quiz[]> {
    const a = this.quizModel.find().populate({
      path: 'questions',
      populate: {
        path: 'optionsId',
      },
    });

    return a;
  }

  async getQuizById(_id: string): Promise<Quiz> {
    const quiz = await this.quizModel.findById(_id);
    return quiz;
  }

  async createQuiz(quizData: CreateQuizDto): Promise<Quiz> {
    const createQuiz = new this.quizModel(quizData);
    return createQuiz.save();
  }

  async updateQuiz(quizData: UpdateQuizDto): Promise<any> {
    const oldquiz = await this.getQuizById(quizData.quizId);
    const questionData = [...oldquiz.questions, quizData.questionId];
    const quiz = this.quizModel.updateOne(
      { _id: quizData.quizId },
      { $set: { questions: questionData } },
    );

    return quiz;
  }
}
