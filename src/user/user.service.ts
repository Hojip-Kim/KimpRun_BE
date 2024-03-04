import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { User } from './user.entity';
import { extendGoogle } from 'src/auth/auth/strategy/GoogleStrategy';
import { Profile } from 'src/profile/entity/profile';
import { DataSource } from 'typeorm'

@Injectable()
export class UserService {

   constructor(
    private userRepository: UserRepository,
    private datasource: DataSource,
   ){}

    /*
    Oauth로그인 시 실행되는 메서드.
    oauth 로그인 시 google측에서 받아오는 email을 통해 
    database에 user가 있다면 해당 user를 return.
    그렇지않다면 해당 email의 user를 데이터베이스에 저장(회원가입)
    이후 user return.

    */
    async findByEmailOrSave(googleUser : extendGoogle): Promise<User> {
      const {email, name, providerId, provider } = googleUser;

      // Transaction 시작
      const queryRunner = this.datasource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try{
      let user = await queryRunner.manager.findOneBy(User, {user_email : email}); // 재할당 scope

      if (!user) {

        const userProfile = new Profile();
        userProfile.nickname = name; // default : Google-oauth name

        user = await queryRunner.manager.create(User, {
          user_email : email,
          user_name : name,
          providerId : providerId,
          provider : provider,
          profile : userProfile
        });

        await queryRunner.manager.save(user);

      }
      //성공시 transaction commit
      await queryRunner.commitTransaction();

      return user;
      } catch (error) {
      //transaction 실행도중 error 발생시 rollback
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // finally QueryRunner 해제
      await queryRunner.release();
    }
    }

}
