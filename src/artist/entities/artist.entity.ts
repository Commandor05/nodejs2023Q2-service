import { Entity, Column, OneToMany } from 'typeorm';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { instanceToPlain } from 'class-transformer';
import { BaseEntity } from 'src/base/entities/base.entity';
import { Album } from 'src/album/entities/album.entity';

@Entity({ name: 'artist' })
export class Artist extends BaseEntity {
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @Column({ type: 'boolean' })
  grammy: boolean;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => Album, (album) => album.artist)
  albums: Album[];

  toJSON() {
    return instanceToPlain(this);
  }
}
