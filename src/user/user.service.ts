import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword, inferCityAndState } from 'src/utils';
import { JwtService } from '@nestjs/jwt';
import { comparePasswordHash } from 'src/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  /** Creates a new user
  * 
  * @param string $name The name of the user
  * @param string $email The email of the user
  * @param number $latitude The latitude of the user
  * @param number $longitude The longitude of the user
  * @param string $password The password of the user
  *
  * @return User The user
  * 
  */
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    // Hash the password
    user.password = await hashPassword(user.password);

    // Infer the city and state from the latitude and longitude
    const { city, state, country } = await inferCityAndState(user.latitude, user.longitude);
    user.city = city;
    user.state = state;

    // Check if the country is the United States
    if (country !== 'US') throw new HttpException('Your country is not supported, USA only', 400);

    return await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  /** Finds a user by id
  * 
  * @param number $id The id of the user
  *
  * @return User The user
  * 
  */
  findOne(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }


  /** Finds a user by a property
  * 
  * @param string $prop The property to find by
  * @param any $value The value to find by
  *
  * @return User The user
  * 
  */
  findOneByProp(prop: any, value: any) {
    return this.userRepository.findOneBy({ [prop]: value });
  }

  /**
   *       
   *      .o.                       .   oooo        
   *     .888.                    .o8   `888        
   *    .8"888.     oooo  oooo  .o888oo  888 .oo.   
   *   .8' `888.    `888  `888    888    888P"Y88b  
   *  .88ooo8888.    888   888    888    888   888  
   * .8'     `888.   888   888    888 .  888   888  
   * o88o     o8888o  `V88V"V8P'   "888" o888o o888o 
   * 
   * */

  // Red flag: this function returns the user's password hash
  // Utility function to find a user by email and password is returned 
  _findUserWithPassByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email }, select: ['password'] });
  }

  /** Logs in a user
   * 
   * @param string $email The email of the user
   * @param string $password The password of the user
   * 
   * @throws HTTPErrors\UnauthorizedException if the credentials are invalid
   * 
   * @return string The access token for the user
   *
   * 
   */
  async login(loginUser: LoginUserDto) {
    const user = await this._findUserWithPassByEmail(loginUser.email);
    if (!user) {
      throw new HttpException('Invalid credentials', 401);
    }
    if (await comparePasswordHash(loginUser.password, user.password) === false) {
      throw new HttpException('Invalid credentials', 401);
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  /** Validates a user by JWT
   * 
   * @param string $payload The payload of the JWT
   * 
   * @throws HTTPErrors\UnauthorizedException if the user is not found
   * 
   *  @return User The user
   * 
   */
  async validateUserByJwt(payload: any) {
    const user = await this.findOneByProp('email', payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  /** Gets the current user from the JWT
   *  
   * @param string $token The JWT
   * 
   * @throws HTTPErrors\UnauthorizedException if the user is not found
   * 
   * @return User The user
   * 
   */
  async getCurrentUserFromToken(token: string) {
    const payload = await this.jwtService.verifyAsync(token);
    return await this.findOneByProp('email', payload.email);
  }
}
