import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [UserModule],
  providers: [BoardsService, UserService]
})
export class BoardsModule {}
