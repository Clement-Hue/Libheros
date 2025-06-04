import { Module } from '@nestjs/common';
import { TaskListController } from './task-list.controller';
import { TaskListService } from './task-list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task, TaskList } from './entities';
import { TaskController } from './task/task.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskList]), AuthModule],
  controllers: [TaskListController, TaskController],
  providers: [TaskListService],
})
export class TaskListModule {}
