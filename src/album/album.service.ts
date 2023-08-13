import {
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = this.albumRepository.create(createAlbumDto);
    const savedAlbum = await this.albumRepository.save(album);

    return savedAlbum;
  }

  async findAll() {
    return this.albumRepository.find();
  }

  async findOne(id: string) {
    return this.albumRepository.findOneBy({ id });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }

    this.albumRepository.merge(album, updateAlbumDto);
    return this.albumRepository.save(album);
  }

  async remove(id: string) {
    return this.albumRepository.delete(id);
  }
}
