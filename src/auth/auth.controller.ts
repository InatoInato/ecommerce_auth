import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(
    @Body("username") username: string,
    @Body("email") email: string,
    @Body("password") password: string,
    @Body("phone") phone: string,
  ){
    try{
      return this.authService.register(username, email, password, phone);
    } catch(e){
      throw new Error("Register error!");
    }
  }

  @Post("login")
  login(
    @Body("username") username: string,
    @Body("password") password: string,
  ){
    try{
      return this.authService.login(username, password);
    } catch(e){
      throw new Error("Login error");
    }
  }
}
