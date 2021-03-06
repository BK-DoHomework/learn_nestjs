import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decoration';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    // console.log('authCredentialsDto', authCredentialsDto)
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  // @Post('/test')
  // @UseGuards(AuthGuard())
  // test(@GetUser() user:User){
  //   console.log('user', user)
  // }


  // @Post('/test')
  // @UseGuards(AuthGuard())
  // test(@Req() req){
  //   console.log('request', req)
  // }
  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user:User){
    console.log(user)
  }
}
