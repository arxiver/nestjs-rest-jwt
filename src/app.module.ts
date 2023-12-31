import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: ["dist/**/*.entity.js"],
        synchronize: true,
        logging: false,
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }


/*
 * @Author: Mohamed Mokhtar
 * @Date: 2023-06-20
 * @Website: https://rrrokhtar.me
 *                      _    _     _             
 *  _ __ _ __ _ __ ___ | | _| |__ | |_ __ _ _ __ 
 * | '__| '__| '__/ _ \| |/ / '_ \| __/ _` | '__|
 * | |  | |  | | | (_) |   <| | | | || (_| | |   
 * |_|  |_|  |_|  \___/|_|\_\_| |_|\__\__,_|_|   
 * 
*/
