import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('/track/:id')
  addTrack(@Param('id') id: string) {
    return this.favsService.addTrack(id);
  }

  @Post('/album/:id')
  addAlbum(@Param('id') id: string) {
    return this.favsService.addAlbum(id);
  }

  @Post('/artist/:id')
  addArtist(@Param('id') id: string) {
    return this.favsService.addArtist(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id') id: string) {
    this.favsService.removeTrack(id);

    return 'Deleted successfully';
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id') id: string) {
    this.favsService.removeArtist(id);

    return 'Deleted successfully';
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id') id: string) {
    this.favsService.removeAlbum(id);

    return 'Deleted successfully';
  }
}
