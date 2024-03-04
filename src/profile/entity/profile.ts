import { TimeStamp } from 'src/common/entity/timestamp';
import { BoardsEntity } from 'src/community/boards/boards/boards.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, Index, Unique, OneToOne, JoinColumn} from 'typeorm'

@Entity({ name: 'profile' })
@Unique(['id'])
export class Profile extends TimeStamp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nickname: string;

    //TODO1 : CASCADE 구현 - profile, auth => soft delete, create cascading

    @OneToOne(() => User, (user) => user.profile) // One to One with user
    user: User;

}