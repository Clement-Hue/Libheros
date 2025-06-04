import { Module } from '@nestjs/common';
import { TaskListController } from './task-list.controller';
import { TaskListService } from './task-list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task, TaskList } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskList])],
  controllers: [TaskListController],
  providers: [TaskListService],
})
export class TaskListModule {}
