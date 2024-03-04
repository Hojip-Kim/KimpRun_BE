import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { Redis } from 'ioredis'
import * as session from 'express-session'
import * as passport from 'passport'

/*
1. app을 인자로 받아서 세션 설정.
2. 
*/
export function setUpSession(app: INestApplication): void {
    const configService = app.get<ConfigService>(ConfigService);

    const port = configService.get('REDIS_PORT');
    const host = configService.get('REDIS_HOST');

    // 세션, Redis를 연결할 객체
    const RedisStore = require("connect-redis").default;

    //Redis client
    const client = new Redis({
        host,
        port,
    });

    app.use(
        session({
            secret: configService.get('SESSION_SECRET'),
            saveUninitialized: false,
            resave: false,
            store: new RedisStore({
                client: client,
                ttl: 30, // time to live (30초)
            }),
            cookie: {
                httpOnly: true,
                secure: true,
                maxAge: 30000, //세션이 redis에 저장되는 기간 (ms) - 30초
            }
        })
    )
    app.use(passport.initialize);
    app.use(passport.session);
}