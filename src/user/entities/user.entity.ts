import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsEmail, IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

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

    @Column()
    @IsNotEmpty()
    city: string;

    @Column()
    @IsNotEmpty()
    state: string;

    @Column({ select: false, type: 'decimal' })
    @IsNotEmpty()
    @IsLatitude()
    @Transform(({ value }) => Number(value))
    latitude: number;

    @Column({ select: false, type: 'decimal' })
    @IsNotEmpty()
    @IsLongitude()
    @Transform(({ value }) => Number(value))
    longitude: number;

    @Column({ select: false, type: 'varchar' })
    @IsNotEmpty()
    password: string;

    @Column({ select: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ select: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

}
