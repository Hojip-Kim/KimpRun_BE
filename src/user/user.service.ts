import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { User } from './user.entity';

interface GoogleUser {
  email: string;
  name: string
  provider: string
  
}

@Injectable()
export class UserService {

   constructor(
    private userRepository: UserRepository
   ){}
    
    async findByEmailOrSave(googleUser : GoogleUser): Promise<User> {
      const {email, name, provider} = googleUser;
      let user = await this.userRepository.findOneBy({user_email : email}); // 재할당 scope

      if (!user) {
        user = await this.userRepository.create({
          user_email : email,
          user_name : name,
          provider : provider
        });
        await this.userRepository.save(user)
      }
      return user;
    }

      // async findOne(email: string): Promise<User | undefined> {
      //   return await this.userRepository.findOne({ where: {user_email : email}});
      // }
}
