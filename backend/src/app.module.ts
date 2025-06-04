import { Module } from '@nestjs/common';
import { TaskListModule } from './task-list/task-list.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task, TaskList } from './task-list/entities';
import { User } from './auth/entities';

@Module({
  imports: [
    TaskListModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Task, TaskList],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
