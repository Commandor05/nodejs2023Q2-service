import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { instanceToPlain } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { validate as isValidUUID } from 'uuid';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { CreateTrackDto } from '../dto/create-track.dto';
import { Fav } from 'src/favs/entities/fav.entity';

export class Track {
  static tracks: Record<string, Track> = {};
  @IsUUID()
  id: string; // uuid v4

  @IsNotEmpty()
  name: string;

  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album

  @IsNotEmpty()
  @IsNumber()
  duration: number; // integer number

  constructor({ name, artistId, albumId, duration }: CreateTrackDto) {
    this.id = uuidv4();
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;

    this.save();
  }

  public save() {
    Track.tracks[this.id] = this;
    return this;
  }

  static isTrackExist(id: string): boolean {
    if (!isValidUUID(id)) {
      throw new HttpException(
        'Bad request. trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    return !!Track.tracks[id];
  }

  static checkTrackIdExist(id: string) {
    if (!Track.isTrackExist(id)) {
      throw new HttpException('Track was not found.', HttpStatus.NOT_FOUND);
    }
    return true;
  }

  static update(id: string, updateTrackDto: UpdateTrackDto) {
    Track.checkTrackIdExist(id);

    Object.keys(updateTrackDto).forEach((key) => {
      Track.tracks[id][key] = updateTrackDto[key];
    });

    return Track.tracks[id];
  }

  static delete(id: string) {
    Track.checkTrackIdExist(id);

    try {
      Fav.deleteEntity(id, 'tracks');
    } catch {}

    delete Track.tracks[id];
  }

  static find(id: string) {
    Track.checkTrackIdExist(id);

    return Track.tracks[id];
  }

  static list(): Track[] {
    return Object.values(Track.tracks);
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
