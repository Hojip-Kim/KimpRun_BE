import { INestApplication, Injectable } from '@nestjs/common';
import { PassportStrategy} from '@nestjs/passport'
import { Profile, Strategy } from 'passport-google-oauth20'
import { BasicOauthUser } from 'src/user/interface/googleUser';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config'

export interface extendGoogle extends BasicOauthUser {
    provider : string
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService, private configService : ConfigService){
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID'),
            client_secret: configService.get('GOOGLE_SECURITY_SECRET'),
            callbackURL: 'http://localhost:3000/api/auth/google',
            scope: ['email', 'profile'],
        });
    }

    // OAuth인증이 끝나고 콜백으로 실행되는 메소드
    async validate(accessToken: string, refreshToken: string, profile: Profile){
        const { id, name, emails } = profile;

        const providerId = id;

        const googleUser : extendGoogle = {
            email : emails[0].value,
            name : name.familyName + name.givenName,
            providerId : providerId,
            provider : 'Google'
        }
        const user: User = await this.userService.findByEmailOrSave(googleUser
        )

        return user;
    }
}