import { TimeStamp } from 'src/common/entity/timestamp';
import { UserEntity } from 'src/user/user.entity';
import {
     Entity, 
     Column, 
     PrimaryGeneratedColumn, 
     ManyToOne,
     JoinColumn
    } 
    from 'typeorm'

// export enum RoleEnumType {
//     USER = 'user',
//     ADMIN = 'admin',
// }

@Entity({ name: 'user' })
export class BoardsEntity extends TimeStamp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    boards_title: string;

    @ManyToOne(() => UserEntity, (user) => user.Boards) // Many To one with User
    @JoinColumn() 
    user: UserEntity;

    @Column()
    contents : string;


    // TODO2 : deletedAt 구현 => cascade로 softdelete구현
    // @Column()
    // deletedAt: TimeStamp;

}