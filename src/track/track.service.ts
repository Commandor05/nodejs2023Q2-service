import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    return new Track(createTrackDto);
  }

  findAll() {
    return Track.list();
  }

  findOne(id: string) {
    return Track.find(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return Track.update(id, updateTrackDto);
  }

  remove(id: string) {
    return Track.delete(id);
  }
}
