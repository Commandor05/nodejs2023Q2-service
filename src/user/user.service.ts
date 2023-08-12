import {
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdatePasswordDto) {
    const user = await this.userRepository.findOneBy({
      id,
    });
    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }

    const { password: currentPassword, version: currentVersion } = user;
    const { oldPassword, newPassword } = updateUserDto;

    if (currentPassword !== oldPassword) {
      throw new HttpException(`Wrong password`, HttpStatus.FORBIDDEN);
    }
    const { affected } = await this.userRepository.update(id, {
      password: newPassword,
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
}
