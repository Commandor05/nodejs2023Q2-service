import { DataSource, DataSourceOptions } from 'typeorm';
import { databaseConfig } from './config/database.config';

const iniitDatabaseConfig = {
  ...databaseConfig,
  migrations: ['src/migrations/*{.ts,.js}'],
  entities: ['src/**/*.entity{ .ts,.js}'],
};

const ds = new DataSource(iniitDatabaseConfig as DataSourceOptions);
ds.initialize();

export default ds;
