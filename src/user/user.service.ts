import {
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { hash, genSalt } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { SaveUserDto } from './dto/save-user.dto';
import { ConfigService } from '@nestjs/config';

@UseInterceptors(ClassSerializerInterceptor)
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const { hash, salt } = await this.hashPassword(password);
    const saveUserDto: SaveUserDto = {
      login,
      hash,
      salt,
    };

    const newUser = this.userRepository.create(saveUserDto);
    const savedUser = await this.userRepository.save(newUser);

    return savedUser;
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async findOneByLogin(login: string) {
    return this.userRepository.findOneBy({
      login,
    });
  }

  async update(id: string, updateUserDto: UpdatePasswordDto) {
    const user = await this.userRepository.findOneBy({
      id,
    });
    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }

    const { hash: currentPasswordHash, version: currentVersion, salt } = user;
    const { oldPassword, newPassword } = updateUserDto;
    const { hash: oldPasswordHash } = await this.hashPassword(
      oldPassword,
      salt,
    );
    const { hash: newPasswordHash, salt: newSalt } = await this.hashPassword(
      newPassword,
      salt,
    );

    if (currentPasswordHash !== oldPasswordHash) {
      throw new HttpException(`Wrong password`, HttpStatus.FORBIDDEN);
    }
    const { affected } = await this.userRepository.update(id, {
      hash: newPasswordHash,
      salt: newSalt,
      updatedAt: new Date().valueOf(),
      version: currentVersion + 1,
    });

    if (affected === 0) {
      throw new HttpException(`User not found`, HttpStatus.BAD_REQUEST);
    }
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);

    return result;
  }

  async hashPassword(
    password: string,
    currentSalt?: string,
  ): Promise<{ hash: string; salt: string }> {
    const saltRounds = parseInt(this.configService.get('auth.cryptSalt'));
    const cslcSalt = await genSalt(saltRounds);
    const salt = currentSalt ?? cslcSalt;
    const hashedPssword = await hash(password, salt);

    return { hash: hashedPssword, salt };
  }
}
