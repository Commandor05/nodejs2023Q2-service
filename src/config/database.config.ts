import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export default registerAs('database', (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',

    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    autoLoadEntities: true,
    entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],

    migrationsTableName: 'migration',

    migrations: ['src/migration/*.ts'],

    ssl: false,
    synchronize: true,
    dropSchema: true,
  };
});
