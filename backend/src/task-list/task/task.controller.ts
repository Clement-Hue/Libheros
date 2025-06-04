import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { TaskListService } from '../task-list.service';
import { UpdateTaskDto } from '../dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskListService: TaskListService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async removeTask(@Param('id') taskId: string) {
    await this.taskListService.removeTask(taskId);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateTask(@Param('id') taskId: string, @Body() data: UpdateTaskDto) {
    const task = await this.taskListService.updateTask(taskId, data);
    return {
      data: task,
    };
  }
}
