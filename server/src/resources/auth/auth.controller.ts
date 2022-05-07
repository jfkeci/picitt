import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DefaultIdParamDto } from 'src/interfaces/default-params.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  registerUser(@Body() user: RegisterUserDto) {
    return this.authService.registerUser(user);
  }

  @Post('/login')
  loginUser(@Body() user: LoginUserDto) {
    return this.authService.loginUser(user);
  }

  @Get('/verify/:userId/:token')
  verifyEmail(@Param() param: VerifyEmailDto) {
    return this.authService.verifyEmail(param);
  }

  @Get(':id')
  recoverPassword(@Param() param: DefaultIdParamDto) {
    return this.authService.recoverPassword(param.id);
  }
}
