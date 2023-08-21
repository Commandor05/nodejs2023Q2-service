import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSaltFieldToUsers1692625471587 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "salt" varchar(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "salt"`);
  }
}
