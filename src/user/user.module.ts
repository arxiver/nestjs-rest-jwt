import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniqueFieldValidator } from './user.decorator';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      secretOrKeyProvider: () => process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
    }),
  ],
  providers: [UserService, UniqueFieldValidator],
  exports: [UserService, TypeOrmModule]
})
export class UserModule { }
