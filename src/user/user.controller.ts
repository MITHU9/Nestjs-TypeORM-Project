import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(
    @Body() body: { name: string; email: string; password: string },
  ) {
    const { name, email, password } = body;
    const user = await this.userService.createUser({ name, email, password });
    return user;
  }

  @Get('all')
  async getAllUsers() {
    const users = await this.userService.findAll();
    return users;
  }
}
