import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, CreateUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() data: CreateUserDto) {
    await this.authService.createUser({...data, taskLists: []});
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async auth(@Body() data: AuthDto) {
    const token = await this.authService.auth(data.email, data.password);
    return {
      data: {
        access_token: token.access_token,
      },
    }
  }
}
