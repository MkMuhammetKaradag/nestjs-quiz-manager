import { IsNotEmpty, Length } from 'class-validator';
export class CreateOptionDto {
  @IsNotEmpty({ message: 'The Quiz  should have a question' })
  @Length(3, 255)
  text: string;

  @IsNotEmpty()
  questionId: string;

  @IsNotEmpty()
  isCorrent: boolean;
}
