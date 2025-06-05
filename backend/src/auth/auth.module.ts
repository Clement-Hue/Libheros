import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from './constants';

const TypeOrmUser = TypeOrmModule.forFeature([User])

@Module({
  imports: [
    TypeOrmUser,
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [TypeOrmUser],
})
export class AuthModule {}
