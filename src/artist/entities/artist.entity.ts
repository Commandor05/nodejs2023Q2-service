import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { validate as isValidUUID } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { instanceToPlain } from 'class-transformer';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Fav } from 'src/favs/entities/fav.entity';

export class Artist {
  static artists: Record<string, Artist> = {};

  @IsUUID()
  id: string; // uuid v4

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;

  constructor({ name, grammy }: CreateArtistDto) {
    this.id = uuidv4();
    this.name = name;
    this.grammy = grammy;

    this.save();
  }

  public save() {
    Artist.artists[this.id] = this;
    return this;
  }

  static isArtistExist(id: string): boolean {
    if (!isValidUUID(id)) {
      throw new HttpException(
        'Bad request. ArtistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    return !!Artist.artists[id];
  }

  static checkArtistIdExist(id: string) {
    if (!Artist.isArtistExist(id)) {
      throw new HttpException('Artist was not found.', HttpStatus.NOT_FOUND);
    }
    return true;
  }

  static update(id: string, updateArtistDto: UpdateArtistDto) {
    Artist.checkArtistIdExist(id);

    Object.keys(updateArtistDto).forEach((key) => {
      Artist.artists[id][key] = updateArtistDto[key];
    });

    return Artist.artists[id];
  }

  static delete(id: string) {
    Artist.checkArtistIdExist(id);

    Artist.deleteArtistInTracks(id);
    Artist.deleteArtistInAlbums(id);
    try {
      Fav.deleteEntity(id, 'artists');
    } catch {}
    delete Artist.artists[id];
  }

  static deleteArtistInTracks(artistId: string) {
    Object.keys(Track.tracks).forEach((trackId) => {
      if (Track.tracks[trackId].artistId === artistId) {
        Track.tracks[trackId].artistId = null;
      }
    });
  }

  static deleteArtistInAlbums(artistId: string) {
    Object.keys(Album.albums).forEach((albumId) => {
      if (Album.albums[albumId].artistId === artistId) {
        Album.albums[albumId].artistId = null;
      }
    });
  }

  static find(id: string) {
    Artist.checkArtistIdExist(id);

    return Artist.artists[id];
  }

  static list(): Artist[] {
    return Object.values(Artist.artists);
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
