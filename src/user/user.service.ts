import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    return new User(login, password);
  }

  findAll() {
    return User.list();
  }

  findOne(id: string) {
    return User.find(id);
  }

  update(id: string, updateUserDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updateUserDto;
    return User.updatePassword(id, oldPassword, newPassword);
  }

  remove(id: string) {
    return User.delete(id);
  }
}
