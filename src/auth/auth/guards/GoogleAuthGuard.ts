import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'

@Injectable()

export class GoogleAuthGuard extends AuthGuard('google'){
    async canActivåte(context: any) : Promise<boolean> {
        /*
        부모클래스 메서드 사용 - canActivate() 메서드에서
        GoogleStrategy를 실행, => validate()메서드를 실행함. 실행결과가 null이거나 false이면 401에러가 남.
        */
        const result = (await super.canActivate(context)) as boolean;

        const request = context.switchToHttp().getRequest();
        
        //SessionSErializer 실행 => 세션에 유저정보 저장, 이후 클라이언트에 세션정보 조회를위한 쿠키를 포함해 응답전송.
        await super.logIn(request);
        return result;
    }
}