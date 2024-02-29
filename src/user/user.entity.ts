import { TimeStamp } from 'src/common/entity/timestamp';
import { BoardsEntity } from 'src/community/boards/boards/boards.entity';
import { Entity, Column, PrimaryGeneratedColumn, Index, Unique, OneToMany} from 'typeorm'

export enum RoleEnumType {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity({ name: 'user' })
@Unique(['user_email'])
export class UserEntity extends TimeStamp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_name: string;

    @Index('email_index')
    @Column()
    user_email: string;

    @Column()
    pwd: string;

    //google 로그인
    @Column()
    provider: string;

    @Column()
    oauth_token: string;
    //TODO1 : CASCADE 구현 - profile, auth => soft delete, create cascading

    @Column({
        type: 'enum',
        enum: RoleEnumType,
        default: RoleEnumType.USER
    })
    role: RoleEnumType.USER;

    @OneToMany(() => BoardsEntity, (board) => board.user) // One to Many with boards
    Boards: BoardsEntity[];

    // TODO2 : deletedAt 구현 => cascade로 softdelete구현
    // @Column()
    // deletedAt: TimeStamp;

}