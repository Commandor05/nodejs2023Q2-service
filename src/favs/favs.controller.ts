import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async findAll() {
    return this.favsService.findAll();
  }

  @Post('/track/:id')
  async addTrack(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
      }),
    )
    id: string,
  ) {
    return this.favsService.addTrack(id);
  }

  @Post('/album/:id')
  async addAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
      }),
    )
    id: string,
  ) {
    return this.favsService.addAlbum(id);
  }

  @Post('/artist/:id')
  async addArtist(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
      }),
    )
    id: string,
  ) {
    return this.favsService.addArtist(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
      }),
    )
    id: string,
  ) {
    await this.favsService.removeTrack(id);

    return 'Deleted successfully';
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
      }),
    )
    id: string,
  ) {
    await this.favsService.removeArtist(id);

    return 'Deleted successfully';
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
      }),
    )
    id: string,
  ) {
    await this.favsService.removeAlbum(id);

    return 'Deleted successfully';
  }
}
