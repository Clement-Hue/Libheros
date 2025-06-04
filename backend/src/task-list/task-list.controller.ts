import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Request,
  Post, UseGuards,
} from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { CreateTaskDto, CreateTaskListDto } from './dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task-list')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTaskList(@Body() dto: CreateTaskListDto, @Request() req) {
    const taskList = await this.taskListService.createTaskList({
      name: dto.name,
      id: dto.id,
      tasks: [],
      user: req.user
    });
    const { user, ...data } = taskList;
    return {
      data
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getTaskLists(@Request() req) {
    const taskList = await this.taskListService.getAllTaskList(req.user);
    return {
      data: taskList,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getTasks(@Param('id') listId: string, @Request() req) {
    const tasks = await this.taskListService.getTasksByListId(listId, req.user);
    return {
      data: tasks,
    };
  }

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  async createTask(@Param('id') listId: string, @Body() dto: CreateTaskDto, @Request() req) {
    const task = await this.taskListService.addTaskToList(
      listId,
      req.user,
      dto,
    );
    return {
      data: task,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteTaskList(@Param('id') listId: string, @Request() req) {
    await this.taskListService.removeTaskList(listId, req.user);
  }
}
