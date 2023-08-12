import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
// import { TrackModule } from './track/track.module';
// import { ArtistModule } from './artist/artist.module';
// import { AlbumModule } from './album/album.module';
// import { FavsModule } from './favs/favs.module';
import { DataSource } from 'typeorm';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return { ...configService.get('database') };
      },
    }),
    UserModule,
    // TrackModule,
    // ArtistModule,
    // AlbumModule,
    // FavsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
