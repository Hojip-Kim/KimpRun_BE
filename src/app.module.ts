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
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    UserModule, 
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService : ConfigService) => ({
      type: 'postgres',
      host: configService.get('TYPEORM_HOST'),
      port: +configService.get('TYPEORM_PORT'),
      username: configService.get('TYPEORM_USERNAME'),
      password: configService.get('TYPEORM_PASSWORD'),
      database: configService.get('TYPEORM_DATABASE'),
      entities: [],
      synchronize: configService.get('TYPEORM_SYNCHRONIZE') === 'true',
      })
    })
  ],
  // controllers: [AppController, UserController, AuthController, EventsController],
  // providers: [AppService, UserService, AuthService, EventService, BinanceService, UpbitService],
})
export class AppModule {}
