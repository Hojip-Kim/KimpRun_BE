import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/GoogleAuthGuard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    /*
    로그인을 처리하는 함수, signInDto를 통해 request data handling
    */

    @Get('to-google')//구글로그인으로 이동하는 라우터 메서드 (구글창을 띄움)
    @UseGuards(GoogleAuthGuard) 
    async googleAuth(@Request() req) {}

    /* 
    구글 로그인 성공 시 실행하는 라우터 메서드.
    GoogleAuthGuard에서 canActivate()실행시
    GoogleStrategy가 실행됨. 여기서 validate()메서드가 실행된 후
    googleAuthRedirect()메서드를 실행하여 화면에 뿌림.
    */
    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Request() req, @Response() res){
        const { user } = req;

        return res.send(user);
    }

}
