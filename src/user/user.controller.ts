import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService : UserService){}

    /*
    Get user information
    */
    // @UseGuards()
    // @Get('/')
    // getUserInfo(@Req : Request){


    // }

}
