import { IsString } from 'class-validator';

export class GoogleUser {

    @IsString()
    provider: string;

    @IsString()
    email: string;

    @IsString()
    name: string;

    @IsString()
    oauth_token: string;

}