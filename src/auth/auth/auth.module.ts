import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { GoogleStrategy } from './strategy/GoogleStrategy';
import { UserService } from 'src/user/user.service';
import { ConfigModule } from '@nestjs/config'
import { PassportModule} from '@nestjs/passport'

@Module({
  imports: [forwardRef(() => UserModule), ConfigModule, PassportModule.register({ defaultStrategy : 'google'})],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, UserService],
  exports: [PassportModule]
})
export class AuthModule {}
