import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';

export interface User {
  user_email : string;
  user_name : string;
};

@Injectable()
export class UserService {

   constructor(
    private userRepository: UserRepository
   ){}
    
      async findOne(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: {user_email : email}});
      }
}
