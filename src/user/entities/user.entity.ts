import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNotEmpty()
    @IsEmail()
    @Unique(['email'])
    email: string;

    @Column({ select: false, type: 'varchar' })
    @IsNotEmpty()
    password: string;

    @Column({ select: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ select: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

}
