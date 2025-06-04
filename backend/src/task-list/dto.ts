
export class CreateTaskListDto {
  id: string;
  name: string;
}

export class CreateTaskDto {
  id: string;
  name: string;
  description: string;
  date: Date;
  creationDate: Date;
  completed?: boolean;
}