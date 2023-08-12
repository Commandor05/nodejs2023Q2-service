import { Entity, Column } from 'typeorm';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { instanceToPlain } from 'class-transformer';
import { BaseEntity } from 'src/base/entities/base.entity';

@Entity({ name: 'artist' })
export class Artist extends BaseEntity {
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @Column({ type: 'boolean' })
  grammy: boolean;

  toJSON() {
    return instanceToPlain(this);
  }
}
