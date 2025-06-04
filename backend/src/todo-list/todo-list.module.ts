import { Module } from '@nestjs/common';
import { TodoListController } from './todo-list.controller';

@Module({
  controllers: [TodoListController]
})
export class TodoListModule {}
