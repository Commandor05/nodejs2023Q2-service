import { HttpException, HttpStatus } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { validate as isValidUUID } from 'uuid';

type favType = keyof typeof Fav.favs;

export class Fav {
  static favs = {
    artists: new Map<string, Artist>(),
    albums: new Map<string, Album>(),
    tracks: new Map<string, Track>(),
  };

  static addEntity(id: string, type: favType) {
    switch (type) {
      case 'artists':
        try {
          const arist = Artist.find(id);
          Fav.favs[type].set(id, arist);
        } catch (e) {
          Fav.transformAddingError(
            e,
            "Artist with id doesn't exist.",
            HttpStatus.NOT_FOUND,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        break;
      case 'albums':
        try {
          const album = Album.find(id);
          Fav.favs[type].set(id, album);
        } catch (e) {
          Fav.transformAddingError(
            e,
            "Album with id doesn't exist.",
            HttpStatus.NOT_FOUND,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        break;
      case 'tracks':
        try {
          const track = Track.find(id);
          Fav.favs[type].set(id, track);
        } catch (e) {
          Fav.transformAddingError(
            e,
            "Track with id doesn't exist.",
            HttpStatus.NOT_FOUND,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
          throw e;
        }
        break;
      default:
        throw new HttpException(
          "Fav entity doesn't exist",
          HttpStatus.BAD_REQUEST,
        );
    }
  }

  static transformAddingError(
    e: HttpException,
    message: string,
    originalCode: HttpStatus,
    newCode: HttpStatus,
  ) {
    if (!(e.getStatus() === originalCode)) {
      throw e;
    }
    throw new HttpException(message, newCode);
  }

  static deleteEntity(id: string, type: favType) {
    if (!isValidUUID(id)) {
      throw new HttpException(
        `Bad request. ${type}Id is invalid (not uuid)`,
        HttpStatus.BAD_REQUEST,
      );
    }

    switch (type) {
      case 'artists':
      case 'tracks':
      case 'albums':
        const title = type[0].toUpperCase() + type.slice(1);
        if (!Fav.favs[type].delete(id)) {
          throw new HttpException(
            `${title} was not found.`,
            HttpStatus.NOT_FOUND,
          );
        }
        break;
      default:
        throw new HttpException(
          "Fav entity doesn't exist",
          HttpStatus.BAD_REQUEST,
        );
    }
  }

  static list() {
    return Object.entries(Fav.favs).reduce((acc, [key, entity]) => {
      acc[key] = [...entity.values()];
      return acc;
    }, {});
  }
}
