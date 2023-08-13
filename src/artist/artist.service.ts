import {
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}
  async create(createArtistDto: CreateArtistDto) {
    const artist = this.artistRepository.create(createArtistDto);
    const savedArtist = await this.artistRepository.save(artist);

    return savedArtist;
  }

  async findAll() {
    return this.artistRepository.find();
  }

  async findOne(id: string) {
    return this.artistRepository.findOneBy({ id });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }
    this.artistRepository.merge(artist, updateArtistDto);
    return this.artistRepository.save(artist);
  }

  async remove(id: string) {
    return this.artistRepository.delete(id);
  }
}
