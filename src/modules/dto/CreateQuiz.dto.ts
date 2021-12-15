import { IsNotEmpty, Length } from 'class-validator';
export class CreateQuizDto {
  @IsNotEmpty({ message: 'The Quiz  should have a title' })
  @Length(3, 255)
  title: string;

  @IsNotEmpty({ message: 'The Quiz  should have a description' })
  @Length(3)
  description: string;
}
