import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleStrategy } from 'src/auth/auth/strategy/GoogleStrategy';
import { AuthModule } from 'src/auth/auth/auth.module';
import { ConfigService } from '@nestjs/config'

@Module({
    imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
    providers: [UserService, UserRepository, GoogleStrategy, ConfigService],
    exports: [UserService, UserRepository]
})
export class UserModule {}
