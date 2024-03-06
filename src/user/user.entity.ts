import { TimeStamp } from 'src/common/entity/timestamp';
import { BoardsEntity } from 'src/community/boards/boards/boards.entity';
import { Profile } from 'src/profile/entity/profile';
import { Entity, Column, PrimaryGeneratedColumn, Index, Unique, OneToMany, OneToOne, JoinColumn} from 'typeorm'

export enum RoleEnumType {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity({ name: 'user' })
@Unique(['user_email'])
export class User extends TimeStamp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_name: string;

    @Index('email_index')
    @Column()
    user_email: string;

    // TODO : 수동회원가입 시 pwd 구현 - bcrypt
    // @Column()
    // pwd: string;

    //google 로그인
    @Column()
    providerId: string;

    @Column()
    provider: string;

    //TODO1 : CASCADE 구현 - profile, auth => soft delete, create cascading

    // user role
    @Column({
        type: 'enum',
        enum: RoleEnumType,
        default: RoleEnumType.USER
    })
    role: RoleEnumType.USER;

    @OneToMany(() => BoardsEntity, (board) => board.user) // One to Many with boards
    @JoinColumn()
    boards: BoardsEntity[];

    //Todo : Cascade(create, save)
    @OneToOne(() => Profile, (profile) => profile.user, {cascade: true}) // One to One with Profile
    @JoinColumn()
    profile: Profile;

    // TODO2 : deletedAt 구현 => cascade로 softdelete구현
    // @Column()
    // deletedAt: TimeStamp;

}