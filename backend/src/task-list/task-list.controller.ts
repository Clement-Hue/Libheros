import { Body, Controller, Post } from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { CreateTaskListDto } from './dto';

@Controller('task-list')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Post()
  create(@Body() dto: CreateTaskListDto) {
    return this.taskListService.createTaskList(dto);
  }
}
