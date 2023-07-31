import { Injectable } from '@nestjs/common';
import { Fav } from './entities/fav.entity';

@Injectable()
export class FavsService {
  findAll() {
    return Fav.list();
  }

  addTrack(id: string) {
    return Fav.addEntity(id, 'tracks');
  }

  addAlbum(id: string) {
    return Fav.addEntity(id, 'albums');
  }

  addArtist(id: string) {
    return Fav.addEntity(id, 'artists');
  }

  removeTrack(id: string) {
    return Fav.deleteEntity(id, 'tracks');
  }

  removeAlbum(id: string) {
    return Fav.deleteEntity(id, 'albums');
  }

  removeArtist(id: string) {
    return Fav.deleteEntity(id, 'artists');
  }
}
