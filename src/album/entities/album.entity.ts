import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { validate as isValidUUID } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { instanceToPlain } from 'class-transformer';
import { Track } from 'src/track/entities/track.entity';
import { Fav } from 'src/favs/entities/fav.entity';

export class Album {
  static albums: Record<string, Album> = {};

  @IsUUID()
  id: string; // uuid v4
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  artistId: string | null; // refers to Album

  constructor({ name, year, artistId }: CreateAlbumDto) {
    this.id = uuidv4();
    this.name = name;
    this.year = year;
    this.artistId = artistId;

    this.save();
  }

  public save() {
    Album.albums[this.id] = this;
    return this;
  }

  static isAlbumExist(id: string): boolean {
    if (!isValidUUID(id)) {
      throw new HttpException(
        'Bad request. AlbumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    return !!Album.albums[id];
  }

  static checkAlbumIdExist(id: string) {
    if (!Album.isAlbumExist(id)) {
      throw new HttpException('Album was not found.', HttpStatus.NOT_FOUND);
    }
    return true;
  }

  static update(id: string, updateAlbumDto: UpdateAlbumDto) {
    Album.checkAlbumIdExist(id);

    Object.keys(updateAlbumDto).forEach((key) => {
      Album.albums[id][key] = updateAlbumDto[key];
    });

    return Album.albums[id];
  }

  static delete(id: string) {
    Album.checkAlbumIdExist(id);

    Album.deleteAlbumInTracks(id);
    try {
      Fav.deleteEntity(id, 'albums');
    } catch {}
    delete Album.albums[id];
  }

  static deleteAlbumInTracks(albumId: string) {
    Object.keys(Track.tracks).forEach((trackId) => {
      if (Track.tracks[trackId].albumId === albumId) {
        Track.tracks[trackId].albumId = null;
      }
    });
  }

  static find(id: string) {
    Album.checkAlbumIdExist(id);

    return Album.albums[id];
  }

  static list(): Album[] {
    return Object.values(Album.albums);
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
