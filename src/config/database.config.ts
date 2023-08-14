import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',

  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  autoLoadEntities: true,
  entities: ['/dist/**/*.entity{ .ts,.js}'],
  migrations: ['/dist/migrations/*{.ts,.js}'],

  migrationsTableName: 'migration',

  ssl: false,
  synchronize: false,
  // dropSchema: true,
};
export default registerAs(
  'database',
  (): TypeOrmModuleOptions => databaseConfig,
);
