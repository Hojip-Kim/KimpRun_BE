import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>
    ){
        super(repository.target, repository.manager, repository.queryRunner)
    }
}