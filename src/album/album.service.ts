import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    return new Album(createAlbumDto);
  }

  findAll() {
    return Album.list();
  }

  findOne(id: string) {
    return Album.find(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return Album.update(id, updateAlbumDto);
  }

  remove(id: string) {
    return Album.delete(id);
  }
}
