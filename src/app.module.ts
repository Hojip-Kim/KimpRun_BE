import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth/auth.module';
import { EventsController } from './sse_events/events.controller';
import { BinanceService } from './websocket/BinanceService';
import { UpbitService } from './websocket/upbitService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/user.entity';
import { Profile } from './profile/entity/profile';
import { BoardsEntity } from './community/boards/boards/boards.entity';
import { BinanceEventService } from './sse_events/binanceEventService';
import { UpbitEventService } from './sse_events/upbitEventService';
import { ScheduleModule } from '@nestjs/schedule';
import { ExportTradePair } from './websocket/tradepair/tradepair';
import { CronInfo } from './common/cronInfo';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('TYPEORM_HOST'),
        port: configService.get<number>('TYPEORM_PORT'),
        entities: [User, BoardsEntity, Profile],
        username: configService.get<string>('TYPEORM_USERNAME'),
        password: configService.get<string>('TYPEORM_PASSWORD'),
        database: configService.get<string>('TYPEORM_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController, EventsController],
  providers: [
    AppService,
    BinanceEventService,
    UpbitEventService,
    BinanceService,
    UpbitService,
    ExportTradePair,
    CronInfo,
  ],
})
export class AppModule {}
