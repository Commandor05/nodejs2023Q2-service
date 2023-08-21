import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { Fav } from './entities/fav.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fav, Artist, Track, Album])],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
