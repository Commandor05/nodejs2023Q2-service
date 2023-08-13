import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { instanceToPlain } from 'class-transformer';
import { BaseEntity } from 'src/base/entities/base.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

@Entity({ name: 'album' })
export class Album extends BaseEntity {
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Column({ type: 'int' })
  year: number;

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
  @OneToMany((type) => Track, (track) => track.album)
  tracks: Track[];

  toJSON() {
    return instanceToPlain(this);
  }
}
