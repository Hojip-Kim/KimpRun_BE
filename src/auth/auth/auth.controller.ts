import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    /*
    로그인을 처리하는 함수, signInDto를 통해 request data handling
    */
    @Post('/login')
    signIn(@Body() signInDto: Record<string, any>){
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

}
