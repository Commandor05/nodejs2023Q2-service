import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fav, FavCategory } from './entities/fav.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entities/track.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(Fav)
    private favRepository: Repository<Fav>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}
  async findAll() {
    const favs = await this.favRepository.find({
      relations: {
        [FavCategory.ARTISTS]: true,
        [FavCategory.ALBUMS]: true,
        [FavCategory.TRACKS]: true,
      },
    });

    const favDefault = {
      [FavCategory.ARTISTS]: [],
      [FavCategory.ALBUMS]: [],
      [FavCategory.TRACKS]: [],
    };

    const favResp = favs.length
      ? favs.reduce((acc, fav) => {
          return {
            ...acc,
            [fav.category]: fav[fav.category],
          };
        }, {})
      : favDefault;

    return favResp;
  }

  async addTrack(id: string) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException(
        `Track not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    let favTracks = await this.favRepository.findOne({
      relations: {
        [FavCategory.TRACKS]: true,
      },
      where: { category: FavCategory.TRACKS },
    });

    if (!favTracks) {
      favTracks = new Fav();
      favTracks.category = FavCategory.TRACKS;
    }

    favTracks.addTrackToFav(track);

    return this.favRepository.save(favTracks);
  }

  async addAlbum(id: string) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new HttpException(
        `Album not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    let favAlbums = await this.favRepository.findOne({
      relations: {
        [FavCategory.ALBUMS]: true,
      },
      where: { category: FavCategory.ALBUMS },
    });

    if (!favAlbums) {
      favAlbums = new Fav();
      favAlbums.category = FavCategory.ALBUMS;
    }

    favAlbums.addAlbumToFav(album);

    return this.favRepository.save(favAlbums);
  }

  async addArtist(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException(
        `Artist not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    let favArtists = await this.favRepository.findOne({
      relations: {
        [FavCategory.ARTISTS]: true,
      },
      where: { category: FavCategory.ARTISTS },
    });

    if (!favArtists) {
      favArtists = new Fav();
      favArtists.category = FavCategory.ARTISTS;
    }

    favArtists.addArtistToFav(artist);

    return this.favRepository.save(favArtists);
  }

  async removeTrack(id: string) {
    const favTracks = await this.favRepository.findOne({
      relations: {
        [FavCategory.TRACKS]: true,
      },
      where: { category: FavCategory.TRACKS },
    });

    favTracks[FavCategory.TRACKS] = favTracks[FavCategory.TRACKS].filter(
      (track) => track.id !== id,
    );

    return this.favRepository.save(favTracks);
  }

  async removeAlbum(id: string) {
    const favAlbums = await this.favRepository.findOne({
      relations: {
        [FavCategory.ALBUMS]: true,
      },
      where: { category: FavCategory.ALBUMS },
    });

    favAlbums[FavCategory.ALBUMS] = favAlbums[FavCategory.ALBUMS].filter(
      (album) => album.id !== id,
    );

    return this.favRepository.save(favAlbums);
  }

  async removeArtist(id: string) {
    const favArtists = await this.favRepository.findOne({
      relations: {
        [FavCategory.ARTISTS]: true,
      },
      where: { category: FavCategory.ARTISTS },
    });

    favArtists[FavCategory.ARTISTS] = favArtists[FavCategory.ARTISTS].filter(
      (artist) => artist.id !== id,
    );

    return this.favRepository.save(favArtists);
  }
}
