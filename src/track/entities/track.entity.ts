import { Entity, Column, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { BaseEntity } from 'src/base/entities/base.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { instanceToPlain } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { Album } from 'src/album/entities/album.entity';
import { Fav } from 'src/favs/entities/fav.entity';

@Entity({ name: 'track' })
export class Track extends BaseEntity {
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 300 })
  name: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Artist, (artist) => artist.albums, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'artistId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_artist_id',
  })
  artist: Artist;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null; // refers to Artist

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Album, (album) => album.tracks, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'albumId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_album_id',
  })
  album: Album;

  @Column({ type: 'uuid', nullable: true })
  albumId: string | null; // refers to Artist

  @IsNotEmpty()
  @IsNumber()
  @Column({ type: 'int' })
  duration: number; // integer number

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((type) => Fav, (fav) => fav.tracks, {
    onDelete: 'CASCADE',
  })
  favs: Fav[];

  toJSON() {
    return instanceToPlain(this);
  }
}
