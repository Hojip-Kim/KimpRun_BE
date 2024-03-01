import { Request } from 'express';
import { GoogleUser } from 'src/user/dto/googleUserDto';

export interface CustomRequest extends Request {
    user? : GoogleUser; // Request에서 user가 있는지 보고, 있으면 GoogleUser type화
}