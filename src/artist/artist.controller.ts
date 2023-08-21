import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  HttpException,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  async findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
      }),
    )
    id: string,
  ) {
    const artust = await this.artistService.findOne(id);

    if (!artust) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }

    return artust;
  }

  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
      }),
    )
    id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
      }),
    )
    id: string,
  ) {
    const { affected } = await this.artistService.remove(id);
    if (affected === 0) {
      throw new HttpException(`Artist not found`, HttpStatus.NOT_FOUND);
    }

    return 'Deleted successfully';
  }
}
