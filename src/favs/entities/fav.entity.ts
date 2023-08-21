import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Exclude, instanceToPlain } from 'class-transformer';

export enum FavCategory {
  ARTISTS = 'artists',
  ALBUMS = 'albums',
  TRACKS = 'tracks',
}

@Entity({ name: 'fav' })
export class Fav {
  @Exclude()
  @PrimaryColumn()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: FavCategory,
  })
  @PrimaryColumn()
  @Unique(['category', 'id'])
  @Exclude()
  category: FavCategory;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((type) => Artist, (artist) => artist.favs)
  @JoinTable()
  artists: Artist[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((type) => Album, (albums) => albums.favs)
  @JoinTable()
  albums: Album[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((type) => Track, (track) => track.favs)
  @JoinTable()
  tracks: Track[];

  addArtistToFav(artist: Artist) {
    if (!this.artists) {
      this.artists = new Array<Artist>();
    }
    this.artists.push(artist);
  }

  addAlbumToFav(album: Album) {
    if (!this.albums) {
      this.albums = new Array<Album>();
    }
    this.albums.push(album);
  }

  addTrackToFav(track: Track) {
    if (!this.tracks) {
      this.tracks = new Array<Track>();
    }
    this.tracks.push(track);
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
