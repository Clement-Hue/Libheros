import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateTaskListDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  name: string;
}

export class CreateTaskDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  name: string;
  description: string;
  @IsNotEmpty()
  @IsDateString()
  date: Date;
  @IsNotEmpty()
  @IsDateString()
  creationDate: Date;
  @IsNotEmpty()
  completed: boolean;
}

export class UpdateTaskDto {
  @IsNotEmpty()
  name: string;
  description: string;
  @IsNotEmpty()
  @IsDateString()
  date: Date;
  @IsNotEmpty()
  @IsDateString()
  creationDate: Date;
  @IsNotEmpty()
  completed: boolean;
}
