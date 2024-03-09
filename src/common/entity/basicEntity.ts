import {
    CreateDateColumn,
    UpdateDateColumn,
    Entity
} from 'typeorm'

@Entity()
export abstract class BasicEntity {

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;

}