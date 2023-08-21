import {
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = this.trackRepository.create(createTrackDto);
    const savedTrack = await this.trackRepository.save(track);

    return savedTrack;
  }

  async findAll() {
    return this.trackRepository.find();
  }

  async findOne(id: string) {
    return this.trackRepository.findOneBy({ id });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException(`Album not found`, HttpStatus.NOT_FOUND);
    }

    this.trackRepository.merge(track, updateTrackDto);
    return this.trackRepository.save(track);
  }

  async remove(id: string) {
    return this.trackRepository.delete(id);
  }
}
