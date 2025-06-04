import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Request,
  Put, UseGuards,
} from '@nestjs/common';
import { TaskListService } from '../task-list.service';
import { UpdateTaskDto } from '../dto';
import { AuthGuard } from '../../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskListService: TaskListService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async removeTask(@Param('id') taskId: string, @Request() req) {
    await this.taskListService.removeTask(taskId, req.user);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateTask(@Param('id') taskId: string, @Body() data: UpdateTaskDto, @Request() req) {
    const task = await this.taskListService.updateTask(taskId, req.user, data);
    return {
      data: task,
    };
  }
}
