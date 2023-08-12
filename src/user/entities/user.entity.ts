import { Entity, Column } from 'typeorm';
import { Exclude, instanceToPlain } from 'class-transformer';
import { BaseEntity } from 'src/base/entities/base.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  login: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar', length: 300 })
  password: string;

  @Column({ type: 'int', default: 1 })
  version: number; // integer number, increments on update

  @Column({ type: 'float', default: new Date().valueOf() })
  createdAt: number; // timestamp of creation

  @Column({ type: 'float', default: new Date().valueOf() })
  updatedAt: number; // timestamp of last

  // TODO: Find out why this is not working
  // @BeforeUpdate()
  // updateContentOnSave() {
  //   this.updatedAt = new Date().valueOf();
  //   this.version++;
  // }

  toJSON() {
    return instanceToPlain(this);
  }
}
