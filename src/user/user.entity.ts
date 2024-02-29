import { TimeStamp } from 'src/common/entity/timestamp';
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity({ name: 'user' })
export class userEntity extends TimeStamp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_name: string;

    @Column()
    user_email: string;

    @Column()
    pwd: string;

    //google 로그인
    @Column()
    provider: string;

    @Column()
    oauth_token: string;

    // TODO : deletedAt 구현 => cascade로 softdelete구현
    // @Column()
    // deletedAt: TimeStamp;

}