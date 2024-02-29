import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth/auth.module';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth/auth.controller';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth/auth.service';
import { EventsController } from './sse_events/events.controller';
import { EventService } from './sse_events/eventService';
import { BinanceService } from './websocket/BinanceService';
import { UpbitService } from './websocket/upbitService';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    UserModule, 
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [],
      synchronize: true,
    })
  ],
  controllers: [AppController, UserController, AuthController, EventsController],
  providers: [AppService, UserService, AuthService, EventService, BinanceService, UpbitService],
})
export class AppModule {}
