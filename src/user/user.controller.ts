import { Controller, Get, Post, Body, Param, HttpException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '../auth.gaurd';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  /** Creates a new user
  * 
  * @param string $name The name of the user
  * @param string $email The email of the user
  * @param string $password The password of the user
  
  *
  * @throws HTTPErrors\BadRequestException if 
  * - the name is not at least 3 characters
  * - the name is not at most 30 characters
  * - the email is already in use
  * - the email is not at most 60 characters
  * - the email is not a valid email
  * - the password is not at least 8 characters
  * - the password is not at most 30 characters
  *
  * @return access_token The access token for the user
  */
  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /** Gets all users
   * 
   * @return User[] The users
   * 
   * @example
   * const users = await getAllUsers();
   * console.log(users); // [ { id: 1, name: 'John Doe', ... }, { id: 2, name: 'Jane Doe', ... } ]
   */
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /** Gets a user by id
   * 
   * @param string $id The id of the user
   * 
   * @throws HTTPErrors\NotFoundException if the user is not found
   * 
   * @return User The user (name, email, city, state)
   * 
   */
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  /** Logs in a user
   *  
   * @param string $email The email of the user
   * @param string $password The password of the user
   * 
   * @throws HTTPErrors\UnauthorizedException if the email or password is incorrect
   * 
   * @return access_token The access token for the user
   * 
   */
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

}
