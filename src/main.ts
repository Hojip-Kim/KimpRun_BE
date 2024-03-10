import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setUpSession } from './common/session/init.session';
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // entity decorator에 없는 프로퍼티값은 거름
      forbidNonWhitelisted: true, // 엔티티 데코레이터에 없는 값 인입 시 그 값에대한 에러메시지 알려줌 (dto에 정의되지 않은 프로퍼티 차단)
      transform: true // 컨트롤러가 값을 받을 때 컨트롤러에 정의한 타입으로 형 변환 => id로받는값에 타입을 지정한다면 nest에서 자체적으로 타입 변환
    })
  )

  app.enableCors({
    origin: 'http://localhost:3002',
  });

  // setUpSession(app); // TODO
  
  const configService = app.get(ConfigService);

  const port = configService.get('PORT');
  // const whitelist = configService.get('WHITELIST'); // white list 추후 보완

  await app.listen(port); // 임시로 모든곳에서 listen
  console.log(`Server is open on port ${port}`);
}
bootstrap();
