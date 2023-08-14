import { MigrationInterface, QueryRunner } from 'typeorm';
enum FavCategory {
  ARTISTS = 'artists',
  ALBUMS = 'albums',
  TRACKS = 'tracks',
}

export class AddFavCategories1692039967882 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let favCategory: keyof typeof FavCategory;
    for (favCategory in FavCategory) {
      await queryRunner.query(
        `INSERT INTO fav (category) VALUES ('${FavCategory[favCategory]}');`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM fav`);
  }
}
