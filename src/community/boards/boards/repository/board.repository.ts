import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { BoardsEntity } from '../boards.entity';

@Injectable()
export class BoardsRepository extends Repository<BoardsEntity> {
    constructor(
        @InjectRepository(BoardsEntity)
        private readonly repository: Repository<BoardsEntity>
    ){
        super(repository.target, repository.manager, repository.queryRunner)
    }
}