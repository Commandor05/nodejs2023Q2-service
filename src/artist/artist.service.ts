import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    return new Artist(createArtistDto);
  }

  findAll() {
    return Artist.list();
  }

  findOne(id: string) {
    return Artist.find(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return Artist.update(id, updateArtistDto);
  }

  remove(id: string) {
    return Artist.delete(id);
  }
}
