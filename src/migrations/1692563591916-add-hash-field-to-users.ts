import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHashFieldToUsers1692563591916 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "password" TO "hash"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN  "hash" TO "password" `,
    );
  }
}
