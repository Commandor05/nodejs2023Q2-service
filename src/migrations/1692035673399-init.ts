import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1692035673399 implements MigrationInterface {
  name = 'Init1692035673399';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(300) NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "fav" ("id" SERIAL NOT NULL, "category" character varying NOT NULL, CONSTRAINT "UQ_afb8a91c5be0c66d703d2e17fe6" UNIQUE ("category"), CONSTRAINT "PK_ba44aac47336474a35e07473633" PRIMARY KEY ("id", "category"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(300) NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(300) NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying(300) NOT NULL, "password" character varying(300) NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" double precision NOT NULL DEFAULT '1692035675170', "updatedAt" double precision NOT NULL DEFAULT '1692035675170', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "fav_artists_artist" ("favId" integer NOT NULL, "favCategory" character varying NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "PK_77cfaca684ee6a727eb916b9dc4" PRIMARY KEY ("favId", "favCategory", "artistId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e4a6981e8e24088c2cd08b2ded" ON "fav_artists_artist" ("favId", "favCategory") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c65613788f9ce94f6e84b324c7" ON "fav_artists_artist" ("artistId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "fav_albums_album" ("favId" integer NOT NULL, "favCategory" character varying NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_6718a1de35ace6f3b700c106a31" PRIMARY KEY ("favId", "favCategory", "albumId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_35bcea6be0df60a4495586f6cc" ON "fav_albums_album" ("favId", "favCategory") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_28db650411c86ed74aee16922c" ON "fav_albums_album" ("albumId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "fav_tracks_track" ("favId" integer NOT NULL, "favCategory" character varying NOT NULL, "trackId" uuid NOT NULL, CONSTRAINT "PK_8e6f9e4a2e92c3127d403e14f4e" PRIMARY KEY ("favId", "favCategory", "trackId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6ef087cd8ac3c09e39474320bf" ON "fav_tracks_track" ("favId", "favCategory") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6db20f07f4d8785b509f1b67e9" ON "fav_tracks_track" ("trackId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "track" ADD CONSTRAINT "fk_artist_id" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" ADD CONSTRAINT "fk_album_id" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" ADD CONSTRAINT "fk_artist_id" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fav_artists_artist" ADD CONSTRAINT "FK_e4a6981e8e24088c2cd08b2ded1" FOREIGN KEY ("favId", "favCategory") REFERENCES "fav"("id","category") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "fav_artists_artist" ADD CONSTRAINT "FK_c65613788f9ce94f6e84b324c72" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fav_albums_album" ADD CONSTRAINT "FK_35bcea6be0df60a4495586f6ccf" FOREIGN KEY ("favId", "favCategory") REFERENCES "fav"("id","category") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "fav_albums_album" ADD CONSTRAINT "FK_28db650411c86ed74aee16922c0" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fav_tracks_track" ADD CONSTRAINT "FK_6ef087cd8ac3c09e39474320bff" FOREIGN KEY ("favId", "favCategory") REFERENCES "fav"("id","category") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "fav_tracks_track" ADD CONSTRAINT "FK_6db20f07f4d8785b509f1b67e9c" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fav_tracks_track" DROP CONSTRAINT "FK_6db20f07f4d8785b509f1b67e9c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fav_tracks_track" DROP CONSTRAINT "FK_6ef087cd8ac3c09e39474320bff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fav_albums_album" DROP CONSTRAINT "FK_28db650411c86ed74aee16922c0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fav_albums_album" DROP CONSTRAINT "FK_35bcea6be0df60a4495586f6ccf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fav_artists_artist" DROP CONSTRAINT "FK_c65613788f9ce94f6e84b324c72"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fav_artists_artist" DROP CONSTRAINT "FK_e4a6981e8e24088c2cd08b2ded1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" DROP CONSTRAINT "fk_artist_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "fk_album_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "fk_artist_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6db20f07f4d8785b509f1b67e9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6ef087cd8ac3c09e39474320bf"`,
    );
    await queryRunner.query(`DROP TABLE "fav_tracks_track"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_28db650411c86ed74aee16922c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_35bcea6be0df60a4495586f6cc"`,
    );
    await queryRunner.query(`DROP TABLE "fav_albums_album"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c65613788f9ce94f6e84b324c7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e4a6981e8e24088c2cd08b2ded"`,
    );
    await queryRunner.query(`DROP TABLE "fav_artists_artist"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "album"`);
    await queryRunner.query(`DROP TABLE "artist"`);
    await queryRunner.query(`DROP TABLE "fav"`);
    await queryRunner.query(`DROP TABLE "track"`);
  }
}
