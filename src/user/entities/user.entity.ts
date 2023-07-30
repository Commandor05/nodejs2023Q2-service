import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Exclude, instanceToPlain } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { validate as isValidUUID } from 'uuid';

export class User {
  static users: Record<string, User> = {};
  @IsUUID()
  id: string; // uuid v4

  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  @Exclude({ toPlainOnly: true })
  password: string;

  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
    this.id = uuidv4();
    this.version = 1;
    this.createdAt = new Date().valueOf();
    this.updatedAt = new Date().valueOf();
    if (this.isLoginExist(login)) {
      throw new HttpException(
        `User with login ${login} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    this.save();
  }

  isLoginExist(login: string): boolean {
    return !!Object.values(User.users).find(
      ({ login: userLogin }) => userLogin === login,
    );
  }

  public save() {
    User.users[this.id] = this;
    return this;
  }

  static isUserExist(id: string): boolean {
    if (!isValidUUID(id)) {
      throw new HttpException(
        'Bad request. userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    return !!User.users[id];
  }

  static checkUserIdExist(id: string) {
    if (!User.isUserExist(id)) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return true;
  }

  static updatePassword(id: string, oldPassword: string, newPassword: string) {
    User.checkUserIdExist(id);

    const user = User.users[id];

    if (user.password !== oldPassword) {
      throw new HttpException(`Wrong password`, HttpStatus.FORBIDDEN);
    }

    User.users[id].password = newPassword;
    User.users[id].version += 1;
    User.users[id].updatedAt = new Date().valueOf();
    return User.users[id];
  }

  static delete(id: string) {
    User.checkUserIdExist(id);

    delete User.users[id];
  }

  static find(id: string) {
    User.checkUserIdExist(id);

    return User.users[id];
  }

  static list(): User[] {
    return Object.values(User.users);
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
