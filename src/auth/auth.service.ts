import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) { }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto){
    // const result= await this.userRepository.validationUserPassword(authCredentialsDto);
    const username = await this.userRepository.validateUserPassword(authCredentialsDto);

    console.log('username', username);
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

  }
}
